import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

let local = "http://localhost:3000"

let ax = Vue.prototype.$http = axios.create({
	baseURL: local
})

export default new Vuex.Store ({
	state: {
		products: '',
		name: localStorage.getItem('name'),
		token: localStorage.getItem('token'),
		userId: localStorage.getItem('userId'),
		checkLogin: false,
		admin: false,
		user: {},
		subtotal : 0,
		tax: 0,
		finalTotal: 0
	},
	mutations: {
		login (state, payload) {
			state.user = payload.data.user
			state.name = localStorage.getItem('name')
			state.token = localStorage.getItem('token')
			state.userId = localStorage.getItem('userId')
			state.checkLogin = true
			state.admin = payload.data.user.admin
		},
		checkLogin (state,payload) {
			if(localStorage.getItem('token') == undefined ) {
				state.checkLogin = false
			}else{
				state.user = payload.user.data
				state.checkLogin = true
			}
		},
		signout (state) {
			state.name = '',
			state.token = '',
			state.userId = '',
			state.checkLogin = false,
			state.admin = false
		},
		createProduct (state,payload) {
			state.products.unshift(payload.newProduct.data)
		},
		GetAllProducts (state,payload) {
			state.products = payload.AllProduct.data
		},
		deleteItem (state,payload) {
			state.products.forEach((product,index) => {
				if(product._id == payload.productId){
					state.products.splice(index,1)
				}
			})
		},
		updateItem (state,payload) {
			state.products.forEach((product,index) => {
				if(product._id == payload.productId){
					state.products.splice(index,1,payload.updatedProduct.data)
				}
			})
		},
		checkAdmin (state,payload) {
			state.user = payload.user.data
			state.admin = true;
		},
		addCart (state,payload) {
			state.user = payload.updatedUser
		},
		getSubTotal (state,payload) {
			if(payload.user.cart != undefined ){
				let tempTotal = 0;
				payload.user.cart.forEach(cart => {
					tempTotal = tempTotal + cart.subtotal
				})
				state.subtotal = tempTotal
				state.tax = state.subtotal/10
				state.finalTotal = state.subtotal-state.tax				
			}else if(payload.user.cart == undefined ){
				let tempTotal = 0;
				payload.user.data.cart.forEach(cart => {
					tempTotal = tempTotal + cart.subtotal
				})
				state.subtotal = tempTotal
				state.tax = state.subtotal/10
				state.finalTotal = state.subtotal-state.tax
			}
		},
		checkoutCart (state,payload) {
			state.user = payload.updatedUser
			state.subtotal = 0
			state.tax = 0
			state.finalTotal = 0		
		}
	},
	actions: {
		login (context, payload) {
			ax.post('/signin', {
				username: payload.username,
				password: payload.password
			})
			.then(result => {				
				localStorage.setItem("token", result.data.token)
				localStorage.setItem("name", result.data.user.name)
				localStorage.setItem("userId", result.data.user._id)
				alert('login Success')				
				context.commit('login', result)
			})
			.catch(err => {
				alert('failed to login')
			})
		},
		signup (context, payload) {
			ax.post('/signup', {
				name: payload.name,
				email: payload.email,
				password: payload.password,
				username: payload.username
			})
			.then(result => {
				alert('Register Success try to Login')
			})
			.catch(err => {
				alert('Failed to Register')
			})
		},
		checkLogin (context) {
			let checkUser = localStorage.getItem('userId')
			ax.get(`/users/${checkUser}`)
			.then(result => {
				context.commit('checkLogin', {
					user : result
				})
			})			
			.catch(err => {
				alert(' login first ')
			})
		},
		signout (context) {
			localStorage.clear()
			context.commit('signout')			
		},
		createProduct (context,payload) {
			ax.post('/products', {
				productName: payload.productName,
				specialProduct: payload.specialProduct,
				productDesc: payload.productDesc,
				addDesc: payload.addDesc,
				category: payload.category,
				price: payload.price,
				stock: payload.stock,
				image: payload.image				
			})
			.then(newProduct => {
				context.commit('createProduct', {
					newProduct : newProduct
				})
			})
			.catch(err => {
				alert('please fill all the form')
			})
		},
		GetAllProducts (context) {
			ax.get('/products')
			.then(products => {
				context.commit('GetAllProducts', {
					AllProduct : products
				})
			})
			.catch(err => {
				console.log('error get all products')
			})
		},
		deleteItem (context,payload) {
			ax.delete(`/products/${payload}`)
			.then(result => {
				context.commit('deleteItem', {
					productId : payload
				})
			})
			.catch(err => {
				alert('failed to delete')
			})
		},
		updateItem (context,payload) {
			ax.put(`/products/${payload.productId}`, {
				productName: payload.productName,
				specialProduct: payload.specialProduct,
				productDesc: payload.productDesc,
				addDesc: payload.addDesc,
				category: payload.category,
				price: payload.price,
				stock: payload.stock,
				image: payload.image				
			})
			.then(result => {
				context.commit('updateItem', {
					updatedProduct : result,
					productId: payload.productId
				})
			})
			.catch(err => {
				alert('Update failed')
			})
		},
		checkAdmin (context,payload) {
			let checkUser = localStorage.getItem('userId')
			ax.get(`/users/${checkUser}`)
			.then(result => {
				if(result.data.admin){
					context.commit('checkAdmin', {
						user : result
					})
				}
			})
		},
		addCart (context,payload) {
			ax.post(`/users/${payload.userId}`,{
				productId : payload.productId,
				total: payload.total				
			})
			.then(result => {
				context.commit('addCart', {
					updatedUser: result.data
				})
			})
			.catch(err => {
				alert('fail add cart')
			})
		},
		getSubTotal (context) {
			let checkUser = localStorage.getItem('userId')
			ax.get(`/users/${checkUser}`)
			.then(result => {
				if(result.data.admin){
					context.commit('getSubTotal', {
						user : result
					})
				}
				if(!result.data.admin){
					context.commit('getSubTotal', {
						user : result.data
					})
				}
			})	
			.catch(err => {
				console.log(err)
			})		
		},
		checkoutCart (context) {
			let checkUser = localStorage.getItem('userId')
			ax.post(`/users/checkout/${checkUser}`, {
				userId : checkUser
			})
			.then(result => {
				context.commit('checkoutCart' , {
					updatedUser : result
				})
			})
			.catch(err => {
				console.log(err)
			})
		}
	}
})