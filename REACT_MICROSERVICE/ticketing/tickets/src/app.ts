import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError } from "@ticket-share/common";


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
        secure: process.env.NODE_ENV !== 'test'
    })
);


app.all("*", async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
