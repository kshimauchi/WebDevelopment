import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAuth = (
    //The assumption here is that the current-user middleware has already executed
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.currentUser) {
        //custom error handling defined not-authorized-error
        throw new NotAuthorizedError();
    }
    next();
};
//temporarily applied to current user

/*
Middleware to reject the request if the user is not logged in
*/