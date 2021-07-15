import mongoose from 'mongoose';

//new user interface that describes
interface userAttrs {
    email: string,
    password: string;
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

const User = mongoose.model('User', userSchema);
//typescript is not checking the type of arguments being
//passed to the constructor
//we can effectively add this method to do type checking
const buildUser = (attrs: userAttrs) => {
    return new User(attrs);
};

buildUser({
    email: 'test@test.com',
    password: 'password'
});
//error
// buildUser({
//     email: 'fd',
//     password: 345
// });
export { User, buildUser };