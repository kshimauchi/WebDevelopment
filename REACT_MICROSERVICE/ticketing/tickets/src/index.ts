import mongoose from 'mongoose';

import { app } from './app';
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