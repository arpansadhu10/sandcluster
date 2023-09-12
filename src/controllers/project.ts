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
            console.log(req.user);
            const user=req.user as unknown as InstanceType<typeof User>;
            const userId=(req.user as HydratedDocument<InstanceType<typeof User>>);
            // console.log(userId);
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
    async getAllProjects(req:Request,res:Response,next:NextFunction){
        try{
            const user=req.user as unknown as InstanceType<typeof User>;
            const userId=(req.user as HydratedDocument<InstanceType<typeof User>>)._id;
            console.log(userId);
            // const email=user.email;
            const ifUserExists=await ProjectService.ifUserExistsByEmail(String(user.email));
            if(!ifUserExists){
                // this.projectService.ifUserExistsByEmail
                throw new APIError("User does Not Exists",400);
            }
           
            const allProject= await ProjectService.getAllProjects(String(userId._id));
            res.json(ResponseFactory.responseFactory(allProject,"Projects successFully fetched"))
        }catch(err){
            next(err);
        }
    }

    async getProjectById(req: Request, res: Response, next: NextFunction) {
        try {
            const { projectId } = req.params;
            const user = req.user as unknown as InstanceType<typeof User>;
            const userId = (req.user as HydratedDocument<InstanceType<typeof User>>);
            const project = await ProjectService.getProjectById(projectId);
            if(!project.userId){
                throw new APIError("Project does not exist", 404);
            }
            if (project.userId.toString() !== userId._id.toString()) {
                throw new APIError("Unauthorized access", 403);
            }
            res.json(ResponseFactory.responseFactory(project, "Project successfully fetched"));
        } catch (err) {
            next(err);
        }
    }
    
}

export default ProjectController;