const Product = require('../models/product.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.product_create = function (req, res) {
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save(function (err) {
        if (err) {
            return console.log(err);
        }
        res.redirect('/products/list');
    })
};

exports.product_details = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) console.log(err);
        res.render('index.ejs', { data: product })
    })
};

exports.product_list = function (req, res) {
    Product.find(function (err, products) {
        if (err) return console.log(err);
        res.render('show.ejs', { data: products })
    })
};

exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return console.log(err);
        Product.find(function (err, products) {
            if (err) return console.log(err);
            res.render('show.ejs', { data: products })
        })
    });
};

exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return console.log(err);
        Product.find(function (err, products) {
            if (err) return console.log(err);
            res.render('show.ejs', { data: products })
        })
    })
};