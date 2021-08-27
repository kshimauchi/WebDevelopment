import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { json } from 'body-parser';

import { deleteOrderRouter } from './routes/delete';
import { newOrderRouter } from './routes/new';
import { indexOrderRouter } from './routes/index';
import { showOrderRouter } from './routes/show';
import { errorHandler, NotFoundError, currentUser } from "@ticket-share/common";

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

app.use( newOrderRouter );
app.use( indexOrderRouter );
app.use( showOrderRouter );
app.use( deleteOrderRouter );


app.all("*", async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
