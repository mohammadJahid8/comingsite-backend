import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError.js';

import { PaginationHelper } from '../../../helpers/paginationHelper.js';
import { Team } from './team.model.js';

const createTeamMember = async payload => {
  const result = await Team.create(payload);

  return result;
};

const getAllTeamMembers = async (category, paginationOptions) => {
  const { page, limit, skip } =
    PaginationHelper.calculatePagination(paginationOptions);

  const total = await Team.countDocuments({});

  const result = await Team.find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateTeamMember = async (id, payload) => {
  const isExist = await Team.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Team member not found');
  }

  Object.keys(payload).forEach(key => {
    isExist[key] = payload[key];
  });

  const result = await isExist.save();

  return result;
};

const deleteTeamMember = async id => {
  const isExist = await Team.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus[500], 'Team member not found!');
  }

  const result = await Team.findByIdAndDelete(id);
  return result;
};

export const TeamService = {
  createTeamMember,
  getAllTeamMembers,
  deleteTeamMember,
  updateTeamMember,
};
