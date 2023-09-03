import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError.js';
import { jwtHelpers } from '../../../helpers/jwtHelper.js';
import { Admin } from './admin.model.js';

const createAdmin = async payload => {
  const { email } = payload;

  const isAdminExist = await Admin.isAdminExist(email);

  if (isAdminExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Admin already exists');
  }

  const admin = await Admin.create(payload);

  return admin;
};

const adminLogin = async payload => {
  const { email, password } = payload;

  const isAdminExist = await Admin.isAdminExist(email);

  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin does not exist');
  }

  const isPasswordMatch =
    isAdminExist.password &&
    (await Admin.isPasswordMatch(password, isAdminExist?.password));

  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password!');
  }

  const token = jwtHelpers.createToken({
    email: email,
    role: isAdminExist.role,
  });

  return token;
};

const getAdminProfile = async email => {
  const result = await Admin.findOne({
    email,
  });

  return result;
};

const getAllAdmins = async () => {
  const admins = await Admin.find({});
  return admins;
};

const updateAdmin = async (id, payload) => {
  const isExist = await Admin.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Admin not found');
  }

  Object.keys(payload).forEach(key => {
    isExist[key] = payload[key];
  });

  const result = await isExist.save();

  return result;
};

const deleteAdmin = async id => {
  const isExist = await Admin.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus[500], 'Admin not found!');
  }

  const result = await Admin.findByIdAndDelete(id);
  return result;
};

export const AdminService = {
  adminLogin,
  createAdmin,
  getAllAdmins,
  getAdminProfile,
  deleteAdmin,
  updateAdmin,
};
