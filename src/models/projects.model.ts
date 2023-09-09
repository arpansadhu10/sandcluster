import { Ref, getModelForClass, prop } from "@typegoose/typegoose";
import { User } from "./user.model";


export interface ICode{
  js:string,
  html:string,
  css:string,
} 
class ProjectClass {
    @prop()
    public name?: string;

    @prop({ref: () => User})
    public userId?:Ref<InstanceType<typeof User>>

    @prop()
      public code?:ICode

    @prop({default:false})
    public isPublic?:boolean
  }

  export const Project = getModelForClass(ProjectClass);