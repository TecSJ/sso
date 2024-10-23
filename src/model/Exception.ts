export class Exception extends Error {
  
  public code: string;
  public originalError?: Error;
  constructor(code: string, message: string, error?: Error) {
      super(message);
      this.code = code;
      if (error) {
          this.originalError = error;
          this.stack = error.stack;
          console.error('Original error:', error); // Loguea el error original
      }
  }
}
