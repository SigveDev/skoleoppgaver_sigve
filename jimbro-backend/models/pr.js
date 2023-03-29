const mongoose = require('mongoose');

const PrSchema = new mongoose.Schema({
    bench:{
        type: String,
        required: true,
    },
    deadlift:{
        type: String,
        required: true,
    },
    squat:{
        type: String,
        required: true,
    },
},{ timestamps: true });

module.exports = mongoose.model('Pr', PrSchema);