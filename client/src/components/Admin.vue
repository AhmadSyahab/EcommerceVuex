<template>
<div class="container">
	<ul class="nav nav-tabs">
	  <li class="nav-item">
	    <a class="nav-link" data-toggle="tab" href="#home">Add Product</a>
	  </li>
	  <li class="nav-item">
	    <a class="nav-link" data-toggle="tab" href="#remove">Edit or Delete</a>
	  </li>
	</ul>
	<div id="myTabContent" class="tab-content">
	  <div class="tab-pane fade" id="home">
		<AddProduct/>	    
	  </div>
	  <div class="tab-pane fade" id="remove">
	  	<removeProduct v-for="(product,index) in Products" :product="product":key="index"/>
	  </div>
	</div>	
</div>	
</template>

<script>
import { mapActions } from 'vuex'
import AddProduct from '@/components/AddProduct'
import removeProduct from '@/components/removeProduct'
export default {
	components: {
		AddProduct,
		removeProduct
	},
	computed: {
		Products () {
			return this.$store.state.products
		}
	},
	methods: {
		...mapActions([
			'GetAllProducts'
			])
	},
	created () {
		this.GetAllProducts()
	}
}	
</script>