const mongoose = require('mongoose');

const WeekSchema = new mongoose.Schema({
    weekName: String,
    monday: Array,
    tuesday: Array,
    wednesday: Array,
    thursday: Array,
    friday: Array,
    saturday: Array,
    sunday: Array,
},{ timestamps: true });

module.exports = mongoose.model('Week', WeekSchema);