// src/common/dto/global-response.dto.ts
export class GlobalResponse<T> {
  statusCode: number;
  message: string;
  data?: T;
  error?: any;

  constructor(status: number, message: string, data?: T, error?: any) {
    this.statusCode = status;
    this.message = message;
    this.data = data;
    this.error = error;
  }
}
