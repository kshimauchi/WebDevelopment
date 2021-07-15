import mongoose from 'mongoose';


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

//Typescript doesnt have a clue
// about these properties and arguments 
// that are being passed to the constructor
// we need to tell typescript about this
// for a verification or validation
// currently you could completely mangle this and 
// typescript would just be happy joy joy
new User({
    email: 'test@test.com',
    password: 'hfkdhsai'
});

export { User };