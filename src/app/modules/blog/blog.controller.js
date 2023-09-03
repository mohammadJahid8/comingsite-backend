/* eslint-disable no-prototype-builtins */
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync.js';
import sendResponse from '../../../shared/sendResponse.js';
import { BLogService } from './blog.service.js';
import pick from '../../../shared/pick.js';
const paginationFields = ['page', 'limit'];

const createBlog = catchAsync(async (req, res) => {
  console.log(req.body.data);
  const result = await BLogService.createBlog(req.body.data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields);
  const category = req.params.category;

  const result = await BLogService.getAllBlogs(category, paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All blogs got!',
    data: result,
  });
});
const getBlogById = catchAsync(async (req, res) => {
  const result = await BLogService.getBlogById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single blog got!',
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body.data;

  for (let key in updatedData) {
    if (updatedData.hasOwnProperty(key) && updatedData[key] === '') {
      delete updatedData[key];
    }
  }

  const result = await BLogService.updateBlog(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog updated successfully!',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const result = await BLogService.deleteBlog(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully!',
    data: result,
  });
});
const increaseBlogView = catchAsync(async (req, res) => {
  const result = await BLogService.increaseBlogView(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog view increased successfully!',
    data: result,
  });
});

const topBlogsByView = catchAsync(async (req, res) => {
  const result = await BLogService.topBlogsByView(req.params.category);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Top blogs got successfully!',
    data: result,
  });
});

export const BlogController = {
  createBlog,
  getAllBlogs,
  increaseBlogView,
  deleteBlog,
  updateBlog,
  topBlogsByView,
  getBlogById,
};
