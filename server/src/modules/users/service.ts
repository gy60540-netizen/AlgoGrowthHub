import { User, IUser } from './model.js';
import { AppError } from '../../utils/AppError.js';
import { Role } from '../../config/constants.js';

export class UserService {
  public static async getAllUsers(): Promise<IUser[]> {
    return User.find().select('-password -refreshToken').sort({ createdAt: -1 });
  }

  public static async getUserById(id: string): Promise<IUser> {
    const user = await User.findById(id).select('-password -refreshToken');
    if (!user) {
      throw new AppError('User not found', 404, 'NOT_FOUND');
    }
    return user;
  }

  public static async createUser(data: {
    name: string;
    email: string;
    password: string;
    role?: Role;
    isActive?: boolean;
  }): Promise<IUser> {
    const email = data.email.toLowerCase().trim();
    const existing = await User.findOne({ email });
    if (existing) {
      throw new AppError('User with this email is already registered. Please login instead.', 409, 'CONFLICT');
    }

    const user = await User.create({
      ...data,
      email,
    });
    return this.getUserById(user.id);
  }

  public static async updateUser(
    id: string,
    data: {
      name?: string;
      email?: string;
      password?: string;
      role?: Role;
      isActive?: boolean;
    }
  ): Promise<IUser> {
    const user = await User.findById(id);
    if (!user) {
      throw new AppError('User not found', 404, 'NOT_FOUND');
    }

    if (data.email && data.email !== user.email) {
      const existing = await User.findOne({ email: data.email });
      if (existing) {
        throw new AppError('A user with this email already exists', 409, 'CONFLICT');
      }
      user.email = data.email;
    }

    if (data.name) user.name = data.name;
    if (data.role) user.role = data.role;
    if (data.isActive !== undefined) user.isActive = data.isActive;
    if (data.password) user.password = data.password;

    await user.save();
    return this.getUserById(user.id);
  }

  public static async deleteUser(id: string): Promise<void> {
    const user = await User.findById(id);
    if (!user) {
      throw new AppError('User not found', 404, 'NOT_FOUND');
    }
    await User.findByIdAndDelete(id);
  }
}
