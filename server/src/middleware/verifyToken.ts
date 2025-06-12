import { NextFunction, Request, Response } from "express";

const verifyToken=(req:Request, res:Response, next:NextFunction)=>{
    const token=req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.send("No token detected").status(401)
    }
    next()
}

export default verifyToken