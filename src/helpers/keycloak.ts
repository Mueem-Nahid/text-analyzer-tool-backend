import KeycloakConnect from 'keycloak-connect';
import session from 'express-session';
import passport from 'passport';
import { Strategy as OAuth2Strategy, StrategyOptionsWithRequest } from 'passport-oauth2';
import config from '../config';
import { Request } from 'express';

const keycloak = new KeycloakConnect({
  store: new session.MemoryStore(),
});

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done) => {
  done(null, obj);
});

passport.use(new OAuth2Strategy({
  authorizationURL: `${config.keycloak.baseUrl}/realms/${config.keycloak.realm}/protocol/openid-connect/auth`,
  tokenURL: `${config.keycloak.baseUrl}/realms/${config.keycloak.realm}/protocol/openid-connect/token`,
  clientID: config.keycloak.clientId!,
  clientSecret: config.keycloak.clientSecret!,
  callbackURL: `${config.baseUrl}/auth/callback`,
} as StrategyOptionsWithRequest, (req: Request, accessToken: string, refreshToken: string, profile: any, done: any) => {
  return done(null, profile);
}));

export { keycloak, passport };
