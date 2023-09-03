import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError.js';
import { Portfolio } from './portfolio.model.js';
import { PaginationHelper } from '../../../helpers/paginationHelper.js';

const createPortfolio = async payload => {
  const result = await Portfolio.create(payload);

  return result;
};

const getAllPortfolio = async (categoryPayload, paginationOptions) => {
  const { page, limit, skip } =
    PaginationHelper.calculatePagination(paginationOptions);

  const category = categoryPayload.toLowerCase();

  let query;

  if (category === 'all') {
    query = {};
  } else {
    query =
      category === 'others'
        ? {
            category: {
              $nin: ['design', 'development', 'marketing', 'networking'],
            },
          }
        : { category };
  }
  const portfolio = await Portfolio.find(query)

    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Portfolio.countDocuments(query);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: portfolio,
  };
};

const getPortfolioById = async id => {
  const blog = await Portfolio.findById(id);
  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Portfolio not found');
  }
  return blog;
};

const updatePortfolio = async (id, payload) => {
  const isExist = await Portfolio.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Portfolio not found');
  }

  Object.keys(payload).forEach(key => {
    isExist[key] = payload[key];
  });

  const result = await isExist.save();

  return result;
};

const deletePortfolio = async id => {
  const isExist = await Portfolio.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus[500], 'Portfolio not found!');
  }

  const result = await Portfolio.findByIdAndDelete(id);
  return result;
};

export const PortfolioService = {
  createPortfolio,
  getAllPortfolio,
  deletePortfolio,
  updatePortfolio,
  getPortfolioById,
};
