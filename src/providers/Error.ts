import { Response } from "express";
class ErrorHandler{
    public static APIErrorHandler(err: any, res: Response){
        console.log(err)
        if(err instanceof Error){
            return res.status(500).json({message: 'Server Error', error: err.message})
        }else if(err.name==='Unauthorized'){
            return res.status(400).json({message: 'Unauthorized', error: err.message})
        }
        else{
            return res.status(500).json({message: 'Server Error of Unhandledd Type'})
        }
    }
}
export default ErrorHandler