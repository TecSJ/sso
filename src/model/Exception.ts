export class Exception extends Error {
    
    public message: string;
    constructor( message: string, error: any) {
  
      super(message);
      this.message = message;
      if (error) {
        console.error('Original error:', error);
      }
    }
  }