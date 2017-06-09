import { Schema, model } from 'mongoose';

export default model(
  'User',
  new Schema({
    email: String,
    password: String,
  }),
);
