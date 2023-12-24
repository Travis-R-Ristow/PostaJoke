import mongoose from 'mongoose';

const { Schema } = mongoose;

const USER = new Schema({
  email: {
    type: String,
    required: true,
    validate: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}/
  },
  psw: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  }
});

export type User = {
  email: string;
  psw: string;
  displayName: string;
};

export default mongoose.model('user', USER);
