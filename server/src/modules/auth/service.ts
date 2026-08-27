import { User, IUser } from '../users/model.js';
import { AppError } from '../../utils/AppError.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../../utils/jwt.js';

export class AuthService {
  public static async register(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<{
    user: Partial<IUser>;
    accessToken: string;
    refreshToken: string;
  }> {
    const email = data.email.toLowerCase().trim();
    const existing = await User.findOne({ email });
    if (existing) {
      throw new AppError('User with this email is already registered. Please login instead.', 409, 'CONFLICT');
    }

    const user = await User.create({
      name: data.name.trim(),
      email,
      password: data.password,
      role: 'USER',
      isActive: true,
    });

    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    user.refreshToken = refreshToken;
    user.lastLoginAt = new Date();
    await user.save();

    const userObj = user.toObject() as any;
    delete userObj.password;
    delete userObj.refreshToken;

    return { user: userObj, accessToken, refreshToken };
  }
  public static async login(email: string, password: string): Promise<{
    user: Partial<IUser>;
    accessToken: string;
    refreshToken: string;
  }> {
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user || !user.isActive) {
      throw new AppError('Invalid email or password', 401, 'AUTHENTICATION_ERROR');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new AppError('Invalid email or password', 401, 'AUTHENTICATION_ERROR');
    }

    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    user.refreshToken = refreshToken;
    user.lastLoginAt = new Date();
    await user.save();

    const userObj = user.toObject() as any;
    delete userObj.password;
    delete userObj.refreshToken;

    return { user: userObj, accessToken, refreshToken };
  }

  public static async refreshToken(token: string): Promise<{
    accessToken: string;
    refreshToken: string;
    user: Partial<IUser>;
  }> {
    let payload;
    try {
      payload = verifyRefreshToken(token);
    } catch {
      throw new AppError('Invalid or expired refresh token', 401, 'AUTHENTICATION_ERROR');
    }

    const user = await User.findById(payload.userId).select('+refreshToken');
    if (!user || !user.isActive || user.refreshToken !== token) {
      throw new AppError('Invalid refresh session. Please login again.', 401, 'AUTHENTICATION_ERROR');
    }

    const newPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(newPayload);
    const refreshToken = generateRefreshToken(newPayload);

    user.refreshToken = refreshToken;
    await user.save();

    const userObj = user.toObject() as any;
    delete userObj.password;
    delete userObj.refreshToken;

    return { accessToken, refreshToken, user: userObj };
  }

  public static async logout(userId: string): Promise<void> {
    await User.findByIdAndUpdate(userId, { $unset: { refreshToken: 1 } });
  }

  public static async getMe(userId: string): Promise<IUser> {
    const user = await User.findById(userId).select('-password -refreshToken');
    if (!user) {
      throw new AppError('User not found', 404, 'NOT_FOUND');
    }
    return user;
  }
}
