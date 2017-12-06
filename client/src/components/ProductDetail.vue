<template>
<div class="container">
	<div class="card mb-3">
	  <h3 class="card-header"> {{ product.productName }}</h3>
	  <div class="card-body">
	    <h5 class="card-title"> {{ product.specialProduct }}</h5>
	    <h6 class="card-subtitle text-muted">New Product</h6>
	  </div>
	  <img style="margin: auto; height: 100%; width: 10%; display: block; " :src="product.image" alt="Card image">	  
	  <div class="card-body">
	    <p class="card-text"> {{ product.productDesc }}</p>
	  </div>
	  <ul class="list-group list-group-flush">
	    <li class="list-group-item">Price $ {{ product.price }}</li>
	    <li class="list-group-item">Stock {{ product.stock }}</li>
	  </ul>
	</div>
	<div class="card">
	  <div class="card-body">
	  	<input v-model="total" type="" name="">
	    <h4> <a href="#" @click.prevent="addToCart(userId,product._id)"> Add to Cart <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span> </a> </h4>

	  </div>
	</div>	
</div>			
</template>
<script>
import { mapActions } from 'vuex'
export default {
	props: ['product'],
	computed: {
		userId () {
			return this.$store.state.userId
		}
	},
	data () {
		return {
			total: '',
		}
	},
	methods: {
		...mapActions([
			'addCart'
			]),
		addToCart (userid, productid) {
			this.addCart({
				userId : userid,
				productId : productid,
				total : this.total
			})
			this.total= ''
		} 
	}
}	
</script>
