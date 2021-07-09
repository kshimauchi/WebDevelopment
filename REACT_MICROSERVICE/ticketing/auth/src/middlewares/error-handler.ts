import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { readJsonConfigFile } from 'typescript';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    //Conformed Errors Structures: it becomes to intricate
    if (err instanceof RequestValidationError) {
        return res.status(err.statusCode).send({ errors: err.serializeError() });
    }
    //Email we can test this error since we have not properly
    if (err instanceof DatabaseConnectionError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    res.status(400).send({
        errors: [{ message: 'Something went wrong' }]
    });
};