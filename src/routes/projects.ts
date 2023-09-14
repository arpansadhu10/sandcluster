//Import All Routers Here
import { Router } from "express";
import ProjectController from "../controllers/project";
import isLoggedIn from "../middlewares/authMiddleWare";
import ProjectService from "../services/projectService";
import { Project } from "../models/projects.model";
const projectRouter=Router()

const projectController=new ProjectController();
//Import Child Routes Here
projectRouter.get('/all',isLoggedIn,projectController. getAllProjects)
projectRouter.post('/',isLoggedIn,projectController.createProject)
projectRouter.post('/public',projectController.getAllPublicProjects)
projectRouter.get('/:projectId',isLoggedIn,projectController. getProjectById)
projectRouter.post('/:projectId',isLoggedIn,projectController. editProjectById)
projectRouter.delete('/:projectId',isLoggedIn,projectController. deleteProjectById)


export default projectRouter