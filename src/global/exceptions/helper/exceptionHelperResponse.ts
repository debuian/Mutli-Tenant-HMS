export interface ExceptionHelperResponse {
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
