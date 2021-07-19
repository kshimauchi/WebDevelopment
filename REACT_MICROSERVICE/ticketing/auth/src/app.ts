import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";


//Configures app
const app = express();
//behind ingress engine and express needs to trust this
app.set('trust proxy', true);
app.use(json());

app.use(
    cookieSession({
        //JWT Token is already encrypted
        //and in so doing would make encrypting and decrypting
        //more complicated if multiple languages are used on backend
        signed: false,
        secure: true
    })
);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };