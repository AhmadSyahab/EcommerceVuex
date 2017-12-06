const Product = require('../models/product')


function create(req,res) {
	let product = new Product(req.body);
	product.save((err, product) => {
		if(err){
			res.status(500).send(err)
		}else{
			res.send(product);
		}
	})
}

function findAll(req,res) {
	Product.find().sort({ createdAt : 'desc' })
	.then(allProduct => {
		res.send(allProduct)
	})
	.catch(err => {
		res.status(500).send(err)
	})
}

function destroy(req,res) {
	console.log(req.params.productId)
	Product.remove({
		_id : req.params.productId
	})
	.then(result => {
		console.log("ini result", result)
		res.send(result)
	})
	.catch(err => {
		res.status(500).send(err)
	})	
}

function update(req,res) {
	Product.findOne({
		_id : req.params.productId
	})
	.then(product => {
		product.set({
			productName: req.body.productName || product.productName,
			specialProduct: req.body.specialProduct || product.specialProduct,
			productDesc: req.body.productDesc || product.productDesc,
			addDesc: req.body.addDesc || product.addDesc,
			category: req.body.category || product.category,
			price: req.body.price || product.price,
			stock: req.body.stock || product.stock,
			image: req.body.image || product.image
		})
		product.save((err, result) => {
			if(err) res.status(500).send(err)
			res.send(result)
		})
	})
	.catch(err => {
		res.status(500).send(err)
	})
}


module.exports = {
	create,
	findAll,
	destroy,
	update
}