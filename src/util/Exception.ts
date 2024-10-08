
export class Exception extends Error {
    
    public code: string;
    public message: string;
  
    constructor( code: string, message: string, error?: any) {
      super( message );
      this.code = code;
      this.message = message;
      if (error) {
        console.error('Original error:', error);
      }
    }
  }
  