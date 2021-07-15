import mongoose from 'mongoose';

//new user interface that describes
interface userAttrs {
    email: string,
    password: string;
}
//new interface that describes the properties
//that a User Model has
interface UserModel extends mongoose.Model<any> {
    build(attrs: userAttrs): any;
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
//custom function
//we are going to add the buildUser for cleaner code
//on the user model
userSchema.statics.build = (attrs: userAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<any, UserModel>('User', userSchema);

User.build({
    email: 'test@test.com',
    password: 'password'
});

export { User };
/*
<any>: any types can be changed or transformed,
any could be of type string, number, boolean, null or undefined
but always remains of type any,
like
let age: any = 25;
age = true;
in dealing with object types therefore we use the : syntax
or property
ninja = {name: 'yoshi', age: 25};
console.log(ninja);

this can be problematic within typescript as it increases
error checking
therefore use with caution
*/