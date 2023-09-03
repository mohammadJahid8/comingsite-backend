/* eslint-disable no-prototype-builtins */
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync.js';
import sendResponse from '../../../shared/sendResponse.js';
import { TeamService } from './team.service.js';
import pick from '../../../shared/pick.js';
const paginationFields = ['page', 'limit'];

const createTeamMember = catchAsync(async (req, res) => {
  console.log(req.body);
  const result = await TeamService.createTeamMember(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Team member created successfully',
    data: result,
  });
});

const getAllTeamMembers = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields);
  const category = req.params.category;

  const result = await TeamService.getAllTeamMembers(
    category,
    paginationOptions,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Team Members got!',
    data: result,
  });
});

const updateTeamMember = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  for (let key in updatedData) {
    if (updatedData.hasOwnProperty(key) && updatedData[key] === '') {
      delete updatedData[key];
    }
  }

  const result = await TeamService.updateTeamMember(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Team Member updated successfully!',
    data: result,
  });
});

const deleteTeamMember = catchAsync(async (req, res) => {
  const result = await TeamService.deleteTeamMember(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Team Member deleted successfully!',
    data: result,
  });
});

export const TeamController = {
  createTeamMember,
  getAllTeamMembers,

  deleteTeamMember,
  updateTeamMember,
};
