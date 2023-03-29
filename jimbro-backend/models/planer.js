const mongoose = require('mongoose');

const PlanerSchema = new mongoose.Schema({
    day:{
        type: String,
        required: true,
    },
    time:{
        type: String,
        required: true,
    },
    gym:{
        type: String,
    },
    exerciseDay:{
        type: String,
    },
},{ timestamps: true });

module.exports = mongoose.model('Planer', PlanerSchema);