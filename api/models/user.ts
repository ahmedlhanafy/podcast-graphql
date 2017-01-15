import { Schema, model } from 'mongoose';

// set up a mongoose model and pass it using module.exports
export default model('User', new Schema({
    email: String,
    password: String,
}));
