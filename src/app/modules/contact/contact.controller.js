/* eslint-disable no-prototype-builtins */
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync.js';
import sendResponse from '../../../shared/sendResponse.js';
import { ContactService } from './contact.service.js';
import pick from '../../../shared/pick.js';

const paginationFields = ['page', 'limit'];

const createContact = catchAsync(async (req, res) => {
  console.log(req.body);
  const result = await ContactService.createContact(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Contact created successfully',
    data: result,
  });
});

const getAllContacts = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ContactService.getAllContacts(paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Contacts got!',
    data: result,
  });
});

const deleteContact = catchAsync(async (req, res) => {
  const result = await ContactService.deleteContact(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Contact deleted successfully!',
    data: result,
  });
});

export const ContactController = {
  createContact,
  getAllContacts,

  deleteContact,
};
