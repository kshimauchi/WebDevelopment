import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { json } from 'body-parser';
import { errorHandler, NotFoundError, currentUser } from "@ticket-share/common";
import { createChargeRouter } from './routes/new';
//Configures app
const app = express();
//behind ingress engine and express needs to trust this
app.set('trust proxy', true);
app.use(json());


app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
app.use(currentUser);
//create charge router
app.use(createChargeRouter);

app.all("*", async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
