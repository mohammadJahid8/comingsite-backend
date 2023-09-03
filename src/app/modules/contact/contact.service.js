import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError.js';
import { Contact } from './contact.model.js';
import { PaginationHelper } from '../../../helpers/paginationHelper.js';
import sendEmailByAwsSes from '../../../helpers/sendEmailByAwsSes.js';

const createContact = async payload => {
  const emailSend = await sendEmailByAwsSes(
    payload.name,
    payload.email,
    payload?.companyName || 'N/A',
    payload.message,
    payload.projectType,
    payload.budget,
  );

  if (!emailSend) {
    throw new ApiError(httpStatus[500], 'Email not send!');
  }

  const result = await Contact.create(payload);

  return result;
};

const getAllContacts = async paginationOptions => {
  const { page, limit, skip } =
    PaginationHelper.calculatePagination(paginationOptions);

  const total = await Contact.countDocuments({});

  const result = await Contact.find({})
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

const deleteContact = async id => {
  const isExist = await Contact.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus[500], 'Contact not found!');
  }

  const result = await Contact.findByIdAndDelete(id);
  return result;
};

export const ContactService = {
  createContact,
  getAllContacts,
  deleteContact,
};
