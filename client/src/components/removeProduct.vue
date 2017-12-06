<template>
<div class="container">
	<div class="card mb-3">
	  <h3 class="card-header"> {{ product.productName }}</h3>
	  <div class="card-body">
	    <h5 class="card-title"> {{ product.specialProduct }}</h5>
	    <h6 class="card-subtitle text-muted">Support for coding</h6>
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
	    <h4 data-toggle="modal" :data-target="`#${product._id}`" > Edit this Item <span class="glyphicon glyphicon-edit" aria-hidden="true"></span></h4>
	  </div>
	</div>		
	<div class="card">
	  <div class="card-body">
	    <h4 @click="removeItem(product._id)" > Remove this Item <span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span></h4>
	  </div>
	</div>	

	<div class="modal" :id="product._id">
	      <div class="modal-dialog" role="document">
	        <div class="modal-content">
	          <div class="modal-header">
	            <h5 class="modal-title">Edit</h5>
	            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	              <span aria-hidden="true">&times;</span>
	            </button>
	          </div>
	          <div class="modal-body">
				<div class="form-group">
					     	  <label for="exampleInputProductName">Product Name</label>
					      <input v-model="productName"  class="form-control" aria-describedby="emailHelp" 
					      :placeholder="product.productName">
							  <label for="exampleInputSpecialProduct">Special Product </label>
					      <input v-model="specialProduct"  class="form-control" aria-describedby="emailHelp" 
					      :placeholder="product.specialProduct ">		      
							  <label for="exampleInputProductDescription">Product Description	</label>
					      <input  v-model="productDesc" class="form-control" aria-describedby="emailHelp" 
					      :placeholder="product.productDesc">	
							  <label for="exampleInpuAdditionalDescription">Additonal Description </label>
					      <input  v-model="addDesc" class="form-control" aria-describedby="emailHelp" :placeholder="product.addDesc">		      	      
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
				                <input v-model="price" type="text" class="form-control" id="exampleInputAmount" 
				                :placeholder="product.price">
				                <div class="input-group-addon">.00</div>
				              </div>
				            </div>
				          </div>
							  <label for="exampleInputStock">Stock</label>
					      <input  v-model="stock" class="form-control" aria-describedby="emailHelp" :placeholder="product.stock">	
					      	  <label for="exampleInputStock">image name</label>
					      <input  v-model="image" class="form-control" aria-describedby="emailHelp" :placeholder="product.image">	              		    
					    <div class="form-group">
					      <label for="exampleInputFile">File input</label>
					      <input type="file" class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp">
					      <small id="fileHelp" class="form-text text-muted">Max Size 500px.</small>
					    </div>
					      
	          </div>
	          <div class="modal-footer">
					<button @click="editItem(product._id)" data-dismiss="modal" type="submit" class="btn btn-primary">Submit</button>
					<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
	          </div>
	        </div>
	      </div>
	    </div>

</div>		
</template>

<script>
import { mapActions } from 'vuex'
export default {
	props: ['product'],
	data () {
		return {
			productName: '',
			specialProduct: '',
			productDesc: '',
			addDesc: '',
			category: '',
			price: '',
			stock: '',
			image: ''
		}
	},	
	methods: {
		...mapActions([
			'deleteItem',
			'updateItem'
			]),
		removeItem: function(productId) {
			this.deleteItem(productId)
		},
		editItem: function(idProduct) {
			this.updateItem({
				productId: idProduct,
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