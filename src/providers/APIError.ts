class APIError extends Error{
    constructor(message:string,public status:number){
        super(message);
        this.name = 'APIError';
        this.status=status;

        Error.call(this, message);
        Error.captureStackTrace(this, APIError);
        Object.setPrototypeOf(this, APIError.prototype);
    }
}

export default APIError;
// public static APIError(code:Number,message:string,res:Response){
//     const err={
//         message:message,
//         status:code
//     }
//     this.APIErrorHandler(err,res);
// }