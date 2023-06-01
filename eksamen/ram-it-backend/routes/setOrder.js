const router = require('express').Router();
const Order = require('../models/order');
const dotenv = require('dotenv');
const CryptoJS = require('crypto-js');

dotenv.config();

router.post('/create', async (req, res) => {
    const newOrder = new Order({
        userId: req.body.userId,
        items: req.body.items,
        total: req.body.total,
        address: CryptoJS.AES.encrypt(req.body.address, process.env.SECRET_KEY).toString(),
        city: CryptoJS.AES.encrypt(req.body.city, process.env.SECRET_KEY).toString(),
        zip: req.body.zip,
        name: CryptoJS.AES.encrypt(req.body.name, process.env.SECRET_KEY).toString(),
    });

    try {
        const order = await newOrder.save();
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/find/order/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        const newOrder = {
            userId: order.userId,
            items: order.items,
            total: order.total,
            address: CryptoJS.AES.decrypt(order.address, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8),
            city: CryptoJS.AES.decrypt(order.city, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8),
            zip: order.zip,
            name: CryptoJS.AES.decrypt(order.name, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8),
            createdAt: order.createdAt,
            _id: order._id
        }
        res.status(200).json(newOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/all', async (req, res) => {
    try {
        const orders = await Order.find();
        let newOrders = [];
        for (let i = 0; i < orders.length; i++) {
            newOrders.push({
                userId: orders[i].userId,
                items: orders[i].items,
                total: orders[i].total,
                address: CryptoJS.AES.decrypt(orders[i].address, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8),
                city: CryptoJS.AES.decrypt(orders[i].city, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8),
                zip: orders[i].zip,
                name: CryptoJS.AES.decrypt(orders[i].name, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8),
                createdAt: orders[i].createdAt,
                _id: orders[i]._id
            });
        }
        res.status(200).json(newOrders);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/all/:id', async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.id});
        let newOrders = [];
        for (let i = 0; i < orders.length; i++) {
            newOrders.push({
                userId: orders[i].userId,
                items: orders[i].items,
                total: orders[i].total,
                address: CryptoJS.AES.decrypt(orders[i].address, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8),
                city: CryptoJS.AES.decrypt(orders[i].city, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8),
                zip: orders[i].zip,
                name: CryptoJS.AES.decrypt(orders[i].name, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8),
                createdAt: orders[i].createdAt,
                _id: orders[i]._id
            });
        }
        res.status(200).json(newOrders);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        res.status(200).json('Order deleted!');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;