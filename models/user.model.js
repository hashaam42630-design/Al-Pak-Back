import mongoose from 'mongoose';

// This is the "Blueprint"
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true }); // This adds the time they joined automatically

const User = mongoose.model('User', userSchema);

export default User;