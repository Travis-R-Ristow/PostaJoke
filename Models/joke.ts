import mongoose from 'mongoose';
const { Schema } = mongoose;

const JOKE = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        require: true
    },
    joke: {
        type: String,
        require: true
    },
    punchLine: {
        type: String
    }
});

export type Joke = {
    author: string;
    joke: string;
    punchLine: string;
    timestamp: string;
}

export default mongoose.model('joke', JOKE);
