import express, {Application, NextFunction, Request, Response} from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
import {keycloak, passport} from './helpers/keycloak';
import session from 'express-session';
import limiter from './app/middlewares/throttle';
import morgan from "morgan";
import winston from "winston";
// import {keycloakAdminClient, keycloakAdminConfig} from "./helpers/keycloakAdmin";
// import tokenRequester from "keycloak-request-token";

const app: Application = express();

const memoryStore = new session.MemoryStore();

app.use(cors());

// parse data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(morgan('combined'));
winston.add(new winston.transports.Console());

// cookie parser
app.use(cookieParser());

// // Passport middleware
app.use(session({
  secret: 'mySecret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore,
}));

// Keycloak middleware
app.use(keycloak.middleware());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

/*app.use(async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    console.log("token here: ", token);
    const settings = {
      username: 'test-user',
      password: 'password',
      grantType: 'password',
      clientId: keycloakAdminConfig.clientId,
    };
    if (token) {
      /!*tokenRequester(keycloakAdminConfig.baseUrl, settings)
        .then((token) => {
          console.log(token, "token ==================");
        }).catch((err) => {
        console.log('err ======================', err);
      });*!/
      const userInfo = keycloakAdminClient.accessToken;
      console.log("user info: ", userInfo);
      // req.user = userInfo; // Attach user info to request object
    }
    next();
  } catch (error) {
    console.error('Keycloak middleware error:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
});*/

/*app.use(async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    console.log("token here: ", token);
    if (token) {
      const grantManager = await keycloakAdminClient.grantManager.create({
        clientId: keycloakAdminConfig.clientId,
        clientSecret: keycloakAdminConfig.clientSecret,
      });

      const grant = await grantManager.obtainDirectly({
        grantType: 'password',
        clientId: keycloakAdminConfig.clientId,
        subject: 'test-user',
        password: 'password',
      });

      const accessToken = grant.access_token; // Access token
      // You can decode and verify the token here to get user info
      console.log("user info: ", accessToken.content);
      next();
    } else {
      next();
    }
  } catch (error) {
    console.error('Keycloak middleware error:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
});*/

app.use(limiter);

// application routes
app.use('/api/v1', routes);

// global error handler
app.use(globalErrorHandler);

// handle not found route
app.use((req: Request, res: Response, next: NextFunction): void => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found !',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API not found !',
      },
    ],
  });
  next();
});

export default app;
