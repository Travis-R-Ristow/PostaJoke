import mongoose from 'mongoose';

const { Schema } = mongoose;

const USER = new Schema({
    email: {
        type: String,
        require: true,
        validate: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}/
    },
    psw: {
        type: String,
        require: true
    },
    displayName: {
        type: String,
        require: true
    }
});

export type User = {
    email: string;
    psw: string;
    displayName: string;
}

export default mongoose.model('user', USER);
