import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError.js';
import { Category } from './category.model.js';

const createCategory = async payload => {
  const result = await Category.create(payload);

  return result;
};

const getAllCategories = async () => {
  const result = await Category.find({});

  return result;
};

const deleteCategory = async id => {
  const isExist = await Category.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus[500], 'Category not found!');
  }

  const result = await Category.findByIdAndDelete(id);
  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  deleteCategory,
};
