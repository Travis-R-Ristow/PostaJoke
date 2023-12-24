import mongoose from 'mongoose';
const { Schema } = mongoose;

const JOKE = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    required: true
  },
  joke: {
    type: String,
    required: true
  },
  punchline: {
    type: String
  },
  tags: {
    type: [String]
  },
  timestamp: { type: Date, default: Date.now }
});

export type Joke = {
  author: string;
  joke: string;
  punchline: string;
  tags: string[];
  timestamp: Date;
};

export default mongoose.model('joke', JOKE);
