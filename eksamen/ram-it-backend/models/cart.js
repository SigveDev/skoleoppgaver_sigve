const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    items: {
        type: Array,
    },
    total: {
        type: Number,
    },
    userId: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);