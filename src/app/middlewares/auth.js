import ApiError from '../../errors/ApiError.js';
import httpStatus from 'http-status';

import { jwtHelpers } from '../../helpers/jwtHelper.js';

function auth(...requiredRoles) {
  return (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    try {
      const verifiedUser = jwtHelpers.verifyToken(token);

      if (requiredRoles.includes(verifiedUser.role)) {
        req.user = verifiedUser;
        next();
      } else {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are Unauthorized.');
      }
    } catch (error) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid Token!');
    }
  };
}

export default auth;
