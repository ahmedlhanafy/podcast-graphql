/** @flow */

import mongoose from 'mongoose';

export default mongoose.model(
  'User',
  mongoose.Schema({
    email: String,
    password: String,
  }),
);
