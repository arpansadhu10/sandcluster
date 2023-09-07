//Import All Routers Here
import { Router } from "express";
const projectRouter=Router()


//Import Child Routes Here
projectRouter.get('/',(req,res)=>console.log("hello"))

export default projectRouter