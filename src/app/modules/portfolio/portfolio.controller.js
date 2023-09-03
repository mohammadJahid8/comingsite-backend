/* eslint-disable no-prototype-builtins */
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync.js';
import sendResponse from '../../../shared/sendResponse.js';
import { PortfolioService } from './portfolio.service.js';
import pick from '../../../shared/pick.js';
const paginationFields = ['page', 'limit'];

const createPortfolio = catchAsync(async (req, res) => {
  const result = await PortfolioService.createPortfolio(req.body.data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Portfolio created successfully',
    data: result,
  });
});

const getAllPortfolio = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields);
  const category = req.params.category;

  const result = await PortfolioService.getAllPortfolio(
    category,
    paginationOptions,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Portfolio got!',
    data: result,
  });
});

const getPortfolioById = catchAsync(async (req, res) => {
  const result = await PortfolioService.getPortfolioById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single blog got!',
    data: result,
  });
});

const updatePortfolio = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body.data;

  for (let key in updatedData) {
    if (updatedData.hasOwnProperty(key) && updatedData[key] === '') {
      delete updatedData[key];
    }
  }

  const result = await PortfolioService.updatePortfolio(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Portfolio updated successfully!',
    data: result,
  });
});

const deletePortfolio = catchAsync(async (req, res) => {
  const result = await PortfolioService.deletePortfolio(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Portfolio deleted successfully!',
    data: result,
  });
});

export const PortfolioController = {
  createPortfolio,
  getAllPortfolio,
  getPortfolioById,
  deletePortfolio,
  updatePortfolio,
};
