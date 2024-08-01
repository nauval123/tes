// import {Response, Request, NextFunction} from "express";
// import {ZodError} from "zod";
// import { ResponseError } from "../response/error/error_response";

// export const errorMiddleware = async (error: Error, req: Request, res: Response, next: NextFunction) => {
//     console.log("=======");
//     console.log("error middleware caught error by something");
//     console.log("\n");
//     console.log(next);
//     console.log("=======");

//     if (error instanceof ZodError) {
//         next(error);
//         res.status(400).json({
//             errors: `Validation Error : ${JSON.stringify(error)}`
//         });
//     } else if (error instanceof ResponseError) {
//         next(error);
//         res.status(error.status).json({
//             errors: error.message
//         });
//     } else {
//         next(error);
//         res.status(500).json({
//             errors: error.message
//         });
//     }
// }
// // 

import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ResponseError } from '../response/error/error_response';
import { SequelizeScopeError, ValidationError } from 'sequelize';

export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }

  console.error("\n");
  console.error("Error middleware caught an error:");
  console.error(error);
  console.error("\n");

  if (error instanceof ZodError) {
    res.status(400).json({
      status: 'error Validation',
      message: 'Validation Error',
      errors: error.errors,
    });
  } else if (error instanceof ResponseError) {
    res.status(error.status).json({
      status_code: error.status,
      status: 'error ResponseError',
      message: error.message,
    });
  } else if (error instanceof SequelizeScopeError || error instanceof ValidationError) {
    res.status(400).json({
      status: 'error 400',
      message: error.message,
    });
  } else {
    res.status(400).json({
      status: 'error 400',
      message: error.message || 'Internal Server Error',
    });
  }
};

