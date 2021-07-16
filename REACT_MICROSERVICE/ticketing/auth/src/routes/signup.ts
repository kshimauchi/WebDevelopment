import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { User } from '../models/user';
import { BadRequestError } from "../errors/bad-request-error";
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
    "/api/users/signup",
    [
        body("email").isEmail().withMessage("Email must be valid"),
        body("password")
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage("Password must be between 4 and 20 characters"),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }

        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError('Email already in use!');
        }
        //password hashing never store password in db in plain text

        const user = User.build({ email, password });

        //persist to mongodb
        await user.save();
        //note that https:// needs to be added to post route in postman
        //otherwise it will be ignored and a cookie will not be generated
        //generate JWT id, email, password

        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        },
            //already checked at app startup !
            process.env.JWT_KEY!

        );

        // Store on session object, the type definition installed
        // req.session.jwt = userJwt;
        // redefined
        req.session = {
            jwt: userJwt
        };

        //upon success send back a response
        res.status(201).send(user);
    }
);

export { router as signupRouter };