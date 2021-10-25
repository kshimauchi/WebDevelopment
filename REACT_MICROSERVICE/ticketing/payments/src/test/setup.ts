import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

//  "noImplicitAny": false.
// declare global {
//     namespace NodeJS {
//         interface Global {
//             signin(): string[];
//         }
//     }
// }
// declare var global: typeof globalThis;
// mocking file, from __mocks__
// declare module globalThis {
//     function signup(): string[];
// }
// declare global {
//     function signin(_id?: string): string[];
// }
//verify this is operational
declare global {
    var signin: (id?:string) => string[];
}

jest.mock('../nats-wrapper');

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
    //clears mocks
    jest.clearAllMocks();

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
global.signin = (id?: string) => {
     // (1) build JWT payload. { id, email}
    const payload = {
        id: id || new mongoose.Types.ObjectId().toHexString(),
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
