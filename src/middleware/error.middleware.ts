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
import { Sequelize } from 'sequelize-typescript';
import { Error } from 'sequelize';

export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }

    console.log("\n");
    console.log("error middleware caught error by something");
    console.log("\n");

  if (error instanceof ZodError) {
    res.status(400).json({
      status: 'error Validation',
      message: 'Validation Error',
      errors: error.errors,
    });
  }else if (error instanceof ResponseError) {
    res.status(error.status).json({
      status_code: 400,
      status: 'error ResponseError',
      message: error.message,
    });
  }else if (error instanceof SequelizeScopeError) {
    res.status(400).json({
      status: 'error Db 400',
      message: error.message,
    });
  }else if (error instanceof Error) {
    res.status(400).json({
      status: 'error Db 400',
      message: error.message,
    });
  }
   else {
    console.log("\n");
    console.log(error);
    console.log("\n");
    res.status(500).json({
      status: 'error 500',
      message: error,
    });
  }
};
