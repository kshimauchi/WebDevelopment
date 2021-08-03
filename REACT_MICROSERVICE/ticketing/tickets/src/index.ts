import mongoose from 'mongoose';

import { app } from './app';



const start = async () => {
    //could be local but were using a cluster ip service
    //capture jwt key error if not defined
    if (!process.env.JWT_KEY) {
        
        throw new Error('JWT_KEY must be defined');
    }
    
    if (!process.env.MONGO_URI) {
        
        throw new Error('MONGO_URI must be defined');
    }
    //(1) Security: generally speaking if we have defined a user, pass on the db
    //              we should define, the hardcoded connection string inside the depl files 
    //              as a secret just as we have defined the JWT secret
    //              this is not really a big deal since we are inside a cluster here!

    try {
        
        await mongoose.connect( process.env.MONGO_URI, {
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