/* eslint-disable no-prototype-builtins */
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync.js';
import sendResponse from '../../../shared/sendResponse.js';
import { AdminService } from './admin.service.js';
import { jwtHelpers } from '../../../helpers/jwtHelper.js';

const createAdmin = catchAsync(async (req, res) => {
  const result = await AdminService.createAdmin(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});

const adminLogin = catchAsync(async (req, res) => {
  const result = await AdminService.adminLogin(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin logged in successfully',
    data: result,
  });
});

const getAdminProfile = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  const verifiedEmail = jwtHelpers.verifyToken(token);

  const result = await AdminService.getAdminProfile(verifiedEmail.email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin profile got successfully!',
    data: result,
  });
});

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await AdminService.getAllAdmins();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All admin got!',
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  for (let key in updatedData) {
    if (updatedData.hasOwnProperty(key) && updatedData[key] === '') {
      delete updatedData[key];
    }
  }

  const result = await AdminService.updateAdmin(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin updated successfully!',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const result = await AdminService.deleteAdmin(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin deleted successfully!',
    data: result,
  });
});

export const AdminController = {
  adminLogin,
  createAdmin,
  getAllAdmins,
  getAdminProfile,
  deleteAdmin,
  updateAdmin,
};
