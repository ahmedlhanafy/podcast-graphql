import { Schema, model } from 'mongoose';

// Set up a Mongoose model and pass it using module.exports
export default model('User', new Schema({
    email: String,
    password: String,
}));
