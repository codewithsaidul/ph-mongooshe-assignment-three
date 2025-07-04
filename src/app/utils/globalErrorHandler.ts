import { Request, Response } from "express";
import { APiError } from "./APIError";

export const globalErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: Function
) => {
  if (err.code === 11000 && err.name === "MongoServerError" && err.keyValue) {
    const key = Object.keys(err.keyValue)[0];
    const value = err.keyValue[key];


    const errors = {
      name: "ValidationError",
      errors: {
        [key]: {
          message: `${key} '${value}' already exists. Please use a unique value.`,
          name: "ValidatorError",
          properties: {
            message: `${key} must be unique`,
            type: "unique",
          },
          kind: "unique",
          path: key,
          value: value,
        },
      },
    };

    res.status(400).json({
      message: "Validation Failed",
      success: false,
      error: errors,
    });

    return;
  } else if (err.name === "ValidationError") {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: {
        name: err.name,
        errors: err.errors,
      },
    });

    return;
  } else if (err instanceof APiError) {
    res.status(err.statusCode || 404).json({
      message: err.message,
      success: false,
      error: err.error || {},
    });
    return;
  } else if (err.name === "CastError") {

    const errors = {
      name: "NotFoundError",
      errors: {
        book: {
          message: `Book Not Found`,
          name: "Custom Error",
            properties: {
              message: "Book Not Found",
              type: "Book",
            },
            kind: err.kind || null,
            path: err.path || null,
            value: err.value || null
        },
      },
    };

    res.status(404).json({
      message: "Resource not found",
      success: false,
      error: errors,
    });

    return;
  } else {
    // Unexpected error
    res.status(404).json({
      message: "Internal Server Error",
      success: false,
      error: err.message || err,
    });
  }
};
