
import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler'
import { UserModel } from "../4-models/user-model";


const router = express.Router();


router.post("/login", asyncHandler (async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = await UserModel.findOne({ email: request.body.email, password: request.body.password }).exec();
        if (!user) {
            response.status(401);
            throw new Error("Invalid email or password");
        }
        response.json(generateTokenResponse(user));
    }
    catch (err: any) {
        next(err);
    }
}
));

router.post("/register", asyncHandler (async (request: Request, response: Response, next: NextFunction) => {
    try {
        
        const userExists = await UserModel.findOne({ email: request.body.email }).exec();
        if (userExists) {
            response.status(401);
            throw new Error("User already exists");
        }else{ 
            const user = await UserModel.create(request.body);
            response.json(generateTokenResponse(user));
        }

    }
    catch (err: any) {
        next(err);
    }
}
));

const generateTokenResponse = (user:any) => {
   const token = jwt.sign({
        _id: user._id,   
    email: user.email,
    isAdmin:user.isAdmin
   }, "SomeRandom", {
    expiresIn:"30d"
   });
    return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        city: user.city,
        street: user.street,
        isAdmin: user.isAdmin,
        token: token 
  };
}


export default router;