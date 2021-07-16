import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

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

//capture jwt key error if not defined
if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
}
const start = async () => {
    //could be local but were using a cluster ip service
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('connected to mongodb');
    } catch (err) {
        console.error(err);
    }
    app.listen(3000, () => {
        console.log("Listening on port 3000!!!!!!!!");
    });
};
start();