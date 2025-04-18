export class ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
  
    constructor(data?: T, message = 'Success', success = true) {
      this.success = success;
      this.message = message;
      this.data = data;
    }
  }  