const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    quizzesTaken: [
        {
            topic: String,
            score: Number,
            certificate: String, // Path to certificate PDF
        }
    ],
    badges: [String],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);