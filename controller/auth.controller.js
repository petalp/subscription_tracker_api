import mongoose from "mongoose"
import User from "../models/user.models.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
import { JWT_SECRET } from "../config/env.js";

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{

        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email }) 


        if (existingUser){
            const error = new Error("User already exists");
            error.statusCode = 409;
            throw error;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword  = await bcrypt.hash(password, salt);

        // Create new user
        const newUser =  await User.create ([{ name, email, password: hashedPassword}], {session});

        const token = jwt.sign({userId:newUser[0]._id}, JWT_SECRET, {expiresIn: "1h"});

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            succss:true,
            message:"User created successfully",
            data:{
                token,
            user: newUser[0]
            }
        })

    }catch(error){
        session.abortTransaction();
        next(error);
    }
}

export const signIn = async (req, res, next) => {

}

export const signOut = async (req, res, next) => {

}