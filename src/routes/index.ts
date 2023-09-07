//Import All Routers Here
import { Router } from "express";
import authRouter from "./auth";
const router=Router()


//Import Child Routes Here
router.use('/auth',authRouter)

export default router