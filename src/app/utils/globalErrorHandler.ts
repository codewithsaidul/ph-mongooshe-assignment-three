import { Request, Response } from "express";
import { APiError } from "./APIError";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: Function
) => {
  // =============== Handle Duplicate ISBN Error Message ==================
  // It extracts detailed error info for isbn uniqueness to send a structured response
  if (err.code === 11000 && err.keyValue) {
    const key = Object.keys(err.keyValue)[0];
    const value = err.keyValue[key];

    const errors = {
      name: "ValidationError",
      errors: {
        [key]: {
          message: `${key} '${value}' already exists.`,
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

    res.status(404).json({
      message: "Validation Failed",
      success: false,
      error: errors,
    });

    return;
  }

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    res.status(404).json({
      message: "Validation failed",
      success: false,
      error: {
        name: err.name,
        errors: err.errors,
      },
    });

    return;
  }

  // ✅ Any other custom ApiError (e.g., business rule)
  if (err instanceof APiError) {
    res.status(err.statusCode || 404).json({
      message: err.message,
      success: false,
      error: err.error || {},
    });
    return;
  }

  // Unexpected error
  res.status(404).json({
    message: "Internal Server Error",
    success: false,
    error: err.message || err,
  });
};
