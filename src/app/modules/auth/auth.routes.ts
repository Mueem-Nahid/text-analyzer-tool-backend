import express from 'express';
import { AuthController } from './auth.controller';
import {AuthValidation} from "./auth.validation";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  '/signup',
  validateRequest(AuthValidation.signup),
  AuthController.signup
);

router.post(
  '/signin',
  AuthController.signin
);

export const AuthRoutes = router;