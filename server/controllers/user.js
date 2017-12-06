const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const Product = require('../models/product')
const ObjectId = require('mongodb').ObjectId;


function signUp(req,res) {
	let user = new User(req.body)
	user.save((err, newUser) => {
		if(err) console.log(err)
		res.send(newUser)
	})
}

function signIn(req,res) {
	User.findOne({
		username : req.body.username
	})
	.then(user => {
		if(!user) {res.status(500).send(err)}
			else{
				bcrypt.compare(req.body.password, user.password)
				 .then(function(result) {
				 	jwt.sign({
				 		userId : user._id,
				 		username : user.username,
				 		email : user.email
					}, process.env.secret, function(err,token) {
						res.send({user, message: "Successful Login", token : token })
					});
				 })
				 .catch(err => {
				  res.status(500).send(err);	
				 })
			}			
	})
	.catch(err => {
		res.status(500).send(err);
	})
}

function findUser(req,res) {
	User.findOne({
		_id : req.params.userid
	})
	.then(result => {
		res.send(result)
	})
	.catch(err => {
		res.status(500).send(err)
	})
}

function addCart(req,res) {
	User.findOne({
		_id : req.params.userId
	})
	.then(result => {
		Product.findOne({
			_id : req.body.productId
		})
		.then(product => {
			let check = false
			result.cart.forEach((cart,index) => {
				if(cart.productName == product.productName) {
					let total = +result.cart[index].total + +req.body.total
					let subtotal = product.price * total
					let cart = {
						product: product,
						total: total,
						productName: product.productName,
						subtotal: subtotal
					}
					result.cart.splice(index,1,cart)						
					result.save()
					check = true;
					res.send(result)
				}
			})
				if(!check){
					let subtotal = product.price * req.body.total
					let cart = {
						product: product,
						total: req.body.total,
						productName: product.productName,
						subtotal: subtotal
					}			
					result.cart.push(cart)
					result.save()
					res.send(result)				
				}					
			})	
		.catch(err => {
			res.status(500).send(err)
		})
	})
	.catch(err => {
		res.status(500).send(err)
	})
}

function checkout(req,res) {
	User.findOne({
		_id : req.params.userId
	})
	.then(result => {
		result.cart = [];
		result.save()
		res.send(result)
	})
	.catch(err => {
		res.status(500).send(err)
	})
}


module.exports = {
	signUp,
	signIn,
	findUser,
	addCart,
	checkout
}