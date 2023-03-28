const mongoose = require('mongoose');

const PrSchema = new mongoose.Schema({
    bench:{
        type: String,
    },
    deadlift:{
        type: String,
    },
    squat:{
        type: String,
    },
},{ timestamps: true });

module.exports = mongoose.model('Pr', PrSchema);