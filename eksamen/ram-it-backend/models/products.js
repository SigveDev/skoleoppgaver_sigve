const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);