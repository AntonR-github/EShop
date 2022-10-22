import { IUserModel, UserModel } from "../4-models/user-model";
import bcrypt from "bcryptjs";


async function login(user:IUserModel):Promise<IUserModel>{
    return UserModel.findOne({email:user.email,password:user.password}).exec();
}

async function register(user:IUserModel):Promise<IUserModel>{
     
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    return UserModel.create(user);
         
}

export default {
    login,
    register
};