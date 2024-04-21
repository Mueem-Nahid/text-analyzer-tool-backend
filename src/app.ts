import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
import { keycloak, passport } from './helpers/keycloak';
import session from 'express-session';
import limiter from './app/middlewares/throttle';
import morgan from 'morgan';
import winston from 'winston';

const app: Application = express();

const memoryStore = new session.MemoryStore();

app.use(cors());

// parse data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
