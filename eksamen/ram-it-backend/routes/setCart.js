const Router = require('express').Router();
const Cart = require('../models/cart');

Router.post('/create', async (req, res) => {
    const newCart = new Cart(req.body);

    try {
        const cart = await newCart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
});

Router.get('/find/:id', async (req, res) => {
    try {
        const cart = await Cart.find({ userId: req.params.id });
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
});

Router.put('/update/:id', async (req, res) => {
    let newTotal = 0;
    for (let i = 0; i < req.body.items.length; i++) {
        newTotal += req.body.items[i].price * req.body.items[i].amount;
    }
    try {
        const updatedCart = await Cart.findOneAndUpdate({ userId: req.params.id }, {
            items: req.body.items,
            total: newTotal,
        }, { new: true})
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

Router.delete('/delete/:id', async (req, res) => {
    const cart = await Cart.find({ userId: req.params.id });

    try {
        await cart.delete();
        res.status(200).json('Cart deleted!');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = Router;