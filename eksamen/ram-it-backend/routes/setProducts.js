const router = require('express').Router();
const Product = require('../models/products');

router.get('/all', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/find/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/category/:category', async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/create', async (req, res) => {
    const newProduct = new Product(req.body);

    try {
        const product = await newProduct.save();
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/update/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);

    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json('Product deleted!');
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;