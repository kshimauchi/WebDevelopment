import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';
import jwt from 'jsonwebtoken';

declare global {
    var signin: () => string[];
}

let mongo: any;

beforeAll(async () => {
    
    process.env.JWT_KEY = 'placeholder';
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    mongo = await MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    //reset data
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

//fabricating a signin...
global.signin = () => {
    // (1) build JWT payload. { id, email}
    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com'
    }
    // (2) create the JWT!
    const token = jwt.sign(payload, process.env.JWT_KEY!);
    // (3) build session obj. {jwt: MY_JWT}
    const session = { jwt: token };
    // (4) Turn that session into JSON-
    const sessionJSON = JSON.stringify(session);
    // (5) Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');
    // (6) return a string
    return [`express:sess=${base64}`];
    
};
