import express, {Application, NextFunction, Request, Response} from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
import limiter from './app/middlewares/throttle';
import morgan from "morgan";
import winston from "winston";

const app: Application = express();

app.use(cors());

// parse data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(morgan('combined'));
winston.add(new winston.transports.Console());

// cookie parser
app.use(cookieParser());

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
