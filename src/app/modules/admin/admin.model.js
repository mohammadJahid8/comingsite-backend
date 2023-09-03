import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config/config.js';

const adminSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'admin',
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

adminSchema.statics.isPasswordMatch = async function (givenPass, savedPass) {
  const isMatch = await bcrypt.compare(givenPass, savedPass);

  return isMatch;
};

adminSchema.pre('save', async function (next) {
  // hash password
  if (this.password) {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcrypt_salt_rounds),
    );
  }

  next();
});

adminSchema.statics.isAdminExist = async function (email) {
  const user = await Admin.findOne(
    { email },
    { email: 1, password: 1, role: 1 },
  ).lean();

  return user;
};

export const Admin = model('Admin', adminSchema);
