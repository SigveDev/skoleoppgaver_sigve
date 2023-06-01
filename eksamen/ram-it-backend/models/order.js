const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    items: {
        type: Array,
    },
    total: {
        type: Number,
    },
    userId: {
        type: String,
    },
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    zip: {
        type: Number,
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
