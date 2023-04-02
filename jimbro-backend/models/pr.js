const mongoose = require('mongoose');

const PrSchema = new mongoose.Schema({
    googleId: String,
    bench: String,
    deadlift: String,
    squat: String,
},{ timestamps: true });

module.exports = mongoose.model('Pr', PrSchema);