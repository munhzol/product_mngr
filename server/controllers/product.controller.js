const   mongoose = require('mongoose'),
        ProductSchema = require('../models/product.model'),
        Product = mongoose.model("Product", ProductSchema);


class ProductController {
    index(rq,rs) {
        Product.find()
            .then(products => rs.json(products))
            .catch(err => rs.json(err));
    }
    create(rq,rs) {
        Product.create(rq.body)
            .then(newProduct => rs.json(newProduct))
            .catch(err => rs.json(err));
    }
    update(rq,rs) {
        Product.findByIdAndUpdate({_id:rq.params.id},rq.body,{runValidators:true})
            .then(() => rs.json({'msg':'OK'}))
            .catch(err => rs.json(err));
    }
    delete(rq,rs) {
        Product.deleteOne({_id:rq.params.id})
            .then(() => rs.json({'msg':'OK'}))
            .catch(err => rs.json(err));
    }
    show(rq,rs) {
        Product.findById(rq.params.id)
            .then(product => rs.json(product))
            .catch(err => rs.json(err));
    }
};

module.exports = new ProductController();