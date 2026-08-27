import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { Role, ROLES } from '../../config/constants.js';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
  isActive: boolean;
  refreshToken?: string;
  lastLoginAt?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.USER,
    },
    isActive: { type: Boolean, default: true },
    refreshToken: { type: String, select: false },
    lastLoginAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema);
