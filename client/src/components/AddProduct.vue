<template>
	<form>
	  <fieldset>
	    <legend>Adding product</legend>
	    <div class="form-group">
	     	  <label for="exampleInputProductName">Product Name</label>
	      <input v-model="productName"  class="form-control" aria-describedby="emailHelp" placeholder="Product Name">
			  <label for="exampleInputSpecialProduct">Special Product </label>
	      <input v-model="specialProduct"  class="form-control" aria-describedby="emailHelp" placeholder="Special Product ">		      
			  <label for="exampleInputProductDescription">Product Description	</label>
	      <input  v-model="productDesc" class="form-control" aria-describedby="emailHelp" placeholder="Product Description	">	
			  <label for="exampleInpuAdditionalDescription">Additonal Description </label>
	      <input  v-model="addDesc" class="form-control" aria-describedby="emailHelp" placeholder="Additonal Description ">		      	      
	    </div>
	    <div class="form-group">
	      <label for="exampleSelect1">Category</label>
	      <select v-model="category" class="form-control" >
	        <option value="shoes">Shoes</option>
	        <option value="cloth">Cloth</option>
	      </select>
	    </div>
		<div class="form-group">
            <label class="control-label">Price</label>
            <div class="form-group">
              <label class="sr-only" for="exampleInputAmount">Amount (in dollars)</label>
              <div class="input-group">
                <div class="input-group-addon">$</div>
                <input v-model="price" type="text" class="form-control" id="exampleInputAmount" placeholder="Amount">
                <div class="input-group-addon">.00</div>
              </div>
            </div>
          </div>
			  <label for="exampleInputStock">Stock</label>
	      <input  v-model="stock" class="form-control" aria-describedby="emailHelp" placeholder="Stock">	
	      	  <label for="exampleInputStock">image URL</label>
	      <input  v-model="image" class="form-control" aria-describedby="emailHelp" placeholder="image name">	              		    
	    <div class="form-group">
	      <small id="fileHelp" class="form-text text-muted">Max Size 600 x 600 .</small>
	    </div>
	    <button @click.prevent="addProduct" class="btn btn-primary">Submit</button>
	  </fieldset>
	</form>	
</template>

<script>
import { mapActions } from 'vuex'
export default {
	data () {
		return {
			productName: '',
			specialProduct: '',
			productDesc: '',
			addDesc: '',
			category: '',
			price: '',
			stock: '',
			image: '',
			file: ''
		}
	},
	methods: {
		...mapActions([
			'createProduct'
			]),
		addProduct: function () {
			this.createProduct({
				productName: this.productName,
				specialProduct: this.specialProduct,
				productDesc: this.productDesc,
				addDesc: this.addDesc,
				category: this.category,
				price: this.price,
				stock: this.stock,
				image: this.image				
			})
		}
	}
}	
</script>