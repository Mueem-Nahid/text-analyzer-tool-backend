import { KeycloakAdminClient } from 'keycloak-admin/lib/client';
import config from "../config";

type KeycloakAdminConfig = {
  baseUrl: string;
  realmName: string;
  clientId: string;
  clientSecret: string;
}

const keycloakAdminConfig: KeycloakAdminConfig = {
  baseUrl: config.keycloak.baseUrl!,
  realmName: config.keycloak.realm!,
  clientId: config.keycloak.clientId!,
  clientSecret: config.keycloak.clientSecret!,
};

const keycloakAdminClient = new KeycloakAdminClient (keycloakAdminConfig);

export {keycloakAdminConfig, keycloakAdminClient};

