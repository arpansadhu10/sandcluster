import { getModelForClass, prop, } from "@typegoose/typegoose";

class userClass {
    @prop()
    public name?: string;

    @prop()
    public picture?: string;

    @prop()
    public email?:string;

    @prop()
    public provider?:string;

    @prop({unique:true})
    public googleId?:string
}

export const User = getModelForClass(userClass);

// let document = await userModel.create({ name: 'Kitty' });
