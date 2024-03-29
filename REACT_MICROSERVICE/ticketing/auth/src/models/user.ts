import mongoose from 'mongoose';

import { Password } from '../services/password';
// new user interface that describes a user
interface userAttrs {
    email: string,
    password: string;
}

// new interface that describes the properties
// that a User Model has, replaced any with UserDoc
interface UserModel extends mongoose.Model<any> {
    build(attrs: userAttrs): UserDoc;
}

// interface which will describe the properties
// that the user documents creates
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
    //extra poperties for mongoose would go here
}

const userSchema = new mongoose.Schema({
    email: {
        //typescript --> but in mongoose, it refers to constructor
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    //documentToOjectOptions: transform toJSON a little different in mongoose
    toJSON: {
        //customizing response(s) json normally we do not do this 
        //inside model file more a view responsibility
        transform(doc, ret) {
            //re-map the id field so we can multiple databases _id is for mongo
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});
//hash the password 
userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        //No plain text
        const hashed = await Password.toHash(this.get('password'));
        //update db
        this.set('password', hashed);
    }
    done();

});

userSchema.statics.build = (attrs: userAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
