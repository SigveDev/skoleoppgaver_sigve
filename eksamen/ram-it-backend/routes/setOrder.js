const router = require('express').Router();
const Order = require('../models/order');

router.post('/create', async (req, res) => {
    const newOrder = new Order(req.body);

    try {
        const order = await newOrder.save();
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/find/:id', async (req, res) => {
    try {
        const order = await Order.find({ userId: req.params.id });
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/find/order/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/all', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/all/:id', async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.id});
        res.status(200).json(orders);
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