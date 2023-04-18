const mongoose = require('mongoose');

const PlanerSchema = new mongoose.Schema({
    googleId: String,
    days: Array,
},{ timestamps: true });

module.exports = mongoose.model('Planer', PlanerSchema);