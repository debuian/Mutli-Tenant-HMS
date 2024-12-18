import { HttpStatus } from '@nestjs/common';
import { ExceptionHelperResponse } from './exceptionHelperResponse';

export function formatHttpException(exception): ExceptionHelperResponse {
  let defaultStatus = HttpStatus.INTERNAL_SERVER_ERROR;
  let defaultMessage = 'An error occurred while processing the query';
  let defaultOptions: { description: string; cause: string | string[] } = {
    description: 'A default description of error for Http Exception',
    cause: ['An unknown error occurred'],
  };

  defaultStatus = exception.getStatus();
  defaultMessage = exception.message;

  //Getting Response Object from exception
  const errorResponse = exception.getResponse();
  // this is the rare case where errorResponse contain error and defaultOptions.description is set to error from errorResponse
  if (typeof errorResponse === 'object' && 'error' in errorResponse) {
    defaultOptions.description = errorResponse.error as string;
  }
  //SEtting defaultOptions.cause to errorResponse message useFul for ClassValidtor Multiple Error
  if (typeof errorResponse === 'object' && 'message' in errorResponse) {
    defaultOptions.cause = errorResponse.message as string[];
  }
  //Setting options as defaultOptions if passed any
  if (
    exception.options != undefined &&
    Object.keys(exception.options).length > 0
  ) {
    defaultOptions = exception.options;
  }
  return {
    message: defaultMessage,
    error: {
      name: exception.name,
      status: defaultStatus,
      options: defaultOptions,
    },
  };
}
