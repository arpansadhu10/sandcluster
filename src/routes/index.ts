//Import All Routers Here
import { Router } from "express";
import authRouter from "./auth";
import projectRouter from "./projects";
const router=Router()


//Import Child Routes Here
router.use('/auth',authRouter)
router.use('/project',projectRouter)

export default router