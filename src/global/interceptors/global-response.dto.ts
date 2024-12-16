export class GlobalResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  path?: string;
  error?: any;
}
