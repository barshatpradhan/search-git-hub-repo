import {Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export const authenticateToken = ((req: Request, res: Response, next: NextFunction) =>{

    const authHeader = req.headers['authorization'] || req.get('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return res.status(401).json({error: 'Access token required'});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {userId: string};
        req.userId = decoded.userId
        next();
    }catch(error: any){
        res.status(403).json({error: 'Invalid token'})
    }
})