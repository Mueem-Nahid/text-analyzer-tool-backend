import {keycloakAdminClient, keycloakAdminConfig} from "../../../helpers/keycloakAdmin";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

type IPayload = {
  username: string,
  email: string,
  password: string,
}

const signup = async (payload: IPayload) => {
  const newUserId = await keycloakAdminClient.users.create({
    realm: keycloakAdminConfig.realmName,
    username: payload.username,
    email: payload.email,
    enabled: true,
    firstName: '', // Optional
    lastName: '', // Optional
    credentials: [{type: 'password', value: payload.password, temporary: false}],
  });

  if (!newUserId) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Something went wrong");
  }

  return newUserId;
}

export const AuthService = {
  signup
};