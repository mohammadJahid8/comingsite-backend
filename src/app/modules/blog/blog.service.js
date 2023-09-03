import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError.js';
import { Blog } from './blog.model.js';
import { PaginationHelper } from '../../../helpers/paginationHelper.js';

const createBlog = async payload => {
  const blog = await Blog.create(payload);

  return blog;
};

const getAllBlogs = async (categoryPayload, paginationOptions) => {
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

  const blogs = await Blog.find(query)

    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Blog.countDocuments(query);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: blogs,
  };
};

const getBlogById = async id => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  return blog;
};

const updateBlog = async (id, payload) => {
  const isExist = await Blog.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Blog not found');
  }

  Object.keys(payload).forEach(key => {
    isExist[key] = payload[key];
  });

  const result = await isExist.save();

  return result;
};

const deleteBlog = async id => {
  const isExist = await Blog.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus[500], 'Blog not found!');
  }

  const result = await Blog.findByIdAndDelete(id);
  return result;
};

const increaseBlogView = async id => {
  const result = await Blog.findByIdAndUpdate(
    id,
    {
      $inc: { views: 1 },
    },
    { new: true },
  );
  return result;
};
const topBlogsByView = async categoryPayload => {
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

  const blogs = await Blog.find(query).sort({ views: -1 }).limit(3);

  return blogs;
};

export const BLogService = {
  createBlog,
  getAllBlogs,
  deleteBlog,
  updateBlog,
  increaseBlogView,
  topBlogsByView,
  getBlogById,
};
