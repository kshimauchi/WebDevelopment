import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


interface UserPayload {
    id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            //modifying with new properties
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session?.jwt) {
        return next();
    }
    try {
        // ! is defined
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
        // augmenting currentUser property
        req.currentUser = payload;
    } catch (err) { }
    next();
};
