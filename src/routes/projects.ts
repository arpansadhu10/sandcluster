//Import All Routers Here
import { Router } from "express";
import ProjectController from "../controllers/project";
import isLoggedIn from "../middlewares/authMiddleWare";
import ProjectService from "../services/projectService";
import { Project } from "../models/projects.model";
const projectRouter=Router()

const projectController=new ProjectController();
//Import Child Routes Here
projectRouter.post('/',isLoggedIn,projectController.createProject)

export default projectRouter