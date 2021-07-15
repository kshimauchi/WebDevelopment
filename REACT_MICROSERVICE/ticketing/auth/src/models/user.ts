import mongoose from 'mongoose';
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
});
userSchema.statics.build = (attrs: userAttrs) => {
    return new User(attrs);
};
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// const user = User.build({
//     email: 'test@test.com',
//     password: 'afjkdaljfd'
// });
// user.email
// user.password
// user.createdAt  //would be added to the UserDoc

export { User };
