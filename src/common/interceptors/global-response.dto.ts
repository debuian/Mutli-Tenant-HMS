export class GlobalResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  path?: string;
  error?: any;

  constructor(status: number, message: string, data?: T, error?: any) {
    this.statusCode = status;
    this.message = message;
    this.data = data;
    this.error = error;
  }
}
