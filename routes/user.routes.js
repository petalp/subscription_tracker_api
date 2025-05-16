import { Router } from "express";
import { getUser, getUsers } from "../controller/user.controller.js";
import authorize from "../middleware/auth.middlware.js";

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id',authorize, getUser);    

userRouter.post('/', (req, res)=>res.send({title:'create new user'}));

userRouter.put('/id', (req, res)=>res.send({title:"UPDATE user"}));

userRouter.delete('/id', (req, res)=>res.send({title:'DELETE user'}));

export default userRouter; 