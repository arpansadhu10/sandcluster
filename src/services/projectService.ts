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
    static async ifUserExistsByEmail(email:string){
        return await User.exists({email:email}); 
    }
}

export default ProjectService;