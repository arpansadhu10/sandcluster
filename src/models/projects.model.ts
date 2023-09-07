import { Ref, prop } from "@typegoose/typegoose";
import { User } from "./user.model";

class ProjectClass {
    @prop()
    public name?: string;
    @prop({ref: () => User})
    public userId?:Ref<InstanceType<typeof User>>
  }