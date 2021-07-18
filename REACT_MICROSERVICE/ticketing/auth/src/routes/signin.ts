import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator'

import { RequestValidationError } from '../errors/request-validation-error';

const router = express.Router();

router.post('/api/users/signin',
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('You must supply a password')
    ],
    async (req: Request, res: Response) => {
        //might want to extract this later
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array())
        }
        //it will hang cause I havent created a response yet

    });

export { router as signinRouter };