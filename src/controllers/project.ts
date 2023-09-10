import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import ProjectService from "../services/projectService";
import ErrorHandler from "../providers/Error";
import APIError from "../providers/APIError";
import { HydratedDocument } from "mongoose";
import ResponseFactory from "../providers/responseFactory";

class ProjectController{
    // constructor(private projectService:ProjectService){

    // }
    //todo: body validaton
    async createProject(req:Request,res:Response,next:NextFunction){
        try{
            const user=req.user as unknown as InstanceType<typeof User>;
            const userId=req.user as HydratedDocument<InstanceType<typeof User>>;
            // const email=user.email;
            const ifUserExists=await ProjectService.ifUserExistsByEmail(String(user.email));
            if(!ifUserExists){
                // this.projectService.ifUserExistsByEmail
                throw new APIError("User does Not Exists",400);
            }
            const {name,code,isPublic}=req.body;
            const project= await ProjectService.createProject(name,code,isPublic,String(userId._id));
            res.json(ResponseFactory.responseFactory(project,"Project successFully created"))
        }catch(err){
            next(err);
        }
        

        // const {body.}

    }
}

export default ProjectController;