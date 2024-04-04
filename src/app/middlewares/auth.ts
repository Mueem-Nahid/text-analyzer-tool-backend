import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelper } from '../../helpers/jwtHelper';
import { Secret } from 'jsonwebtoken';
import config from '../../config';

type CustomRequest = {
  kauth?: {
    grant?: {
      access_token?: {
        token: string;
      };
    };
  };
} & Request;

const auth =
  (...requiredRoles: string[]) =>
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      try {
        // Check if user is authenticated by Keycloak
        if (!req.kauth || !req.kauth.grant || !req.kauth.grant.access_token) {
          throw new ApiError(
            httpStatus.UNAUTHORIZED,
            'You are not authorized to perform this action.'
          );
        }

        const token: string = req.kauth.grant.access_token.token;

        let verifiedUser = null;
        verifiedUser = jwtHelper.verifyToken(
          token,
          config.jwt.jwt_secret as Secret
        );

        req.user = verifiedUser;

        if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
          throw new ApiError(
            httpStatus.FORBIDDEN,
            'Forbidden. You are not authorized to perform this action.'
          );
        }

        next();
      } catch (error) {
        next(error);
      }
    };

export default auth;
