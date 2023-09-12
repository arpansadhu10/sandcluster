import APIError from "../providers/APIError";
import { ICode, Project } from "../models/projects.model";
import { User } from "../models/user.model";

class ProjectService{
    // private project: typeof Project;

    // constructor(project: typeof Project) {
    //     this.project = project;
    // }
    static async createProject(name:string,code:ICode,isPublic:boolean,userId:string){
        const project=await Project.create({
            name:name,
            userId:userId,
            isPublic:isPublic,
            code:code
        })
        return project
    }
    // done by a noob

    static async getAllProjects(userId: string) {
        const projects = await Project.find({ userId: userId });
        return projects;
    }
    static async getProjectById(projectId: string) {
        const projects = await Project.findById(projectId);
        if(!projects){
            throw new APIError("Project Does Not Exists",401);
        }
        return projects;
    }


    static async ifUserExistsByEmail(email:string){
        return await User.exists({email:email}); 
    }
}

export default ProjectService;