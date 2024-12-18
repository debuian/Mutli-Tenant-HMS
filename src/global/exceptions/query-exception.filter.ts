import { HttpStatus } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

// Define the structure of the return object
interface QueryExceptionResponse {
  statusCode: number;
  message: string;
  error: {
    name: string;
    status: number;
    options: {
      description: string;
      cause: string | string[];
    };
  };
}

export function QueryExceptionFilter(exception): QueryExceptionResponse {
  let defaultStatus = HttpStatus.INTERNAL_SERVER_ERROR;
  let defaultMessage = 'An error occurred while processing the query';
  let defaultOptions: { description: string; cause: string | string[] } = {
    description: 'A default description of error for failed query',
    cause: ['An unknown error occurred'],
  };

  // Assign details to the defaultOptions
  defaultOptions.description = exception.message;

  defaultOptions.cause = exception.detail;

  if (exception.code) {
    defaultOptions.cause = exception.detail;
    defaultOptions.description = exception.message;

    if (exception.code === '23503') {
      defaultMessage =
        'The specified hotel ID could not be found. Please check the ID and try again.';
      defaultStatus = HttpStatus.BAD_REQUEST;
    } else {
      defaultMessage = `Database error: ${exception.code}`;
      defaultStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  return {
    statusCode: defaultStatus,
    message: defaultMessage,
    error: {
      name: exception.name,
      status: defaultStatus,
      options: defaultOptions,
    },
  };
}
