import { NextFunction, Request, Response } from "express";
import ErrorHandler from '../providers/Error'

const error={
    name:"Unauthorized",
    message:"Please Login"
}
const isLoggedIn=(req:Request,res:Response,next:NextFunction)=>{
    if(req.user!==undefined){
        console.log(req.user,"req.user");
        return next();
    }
    ErrorHandler.APIErrorHandler(error,res)
}

export default isLoggedIn;