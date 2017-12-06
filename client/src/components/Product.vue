<template>
<div class="container">
	<router-view :products="products"/>
</div>
</template>

<script>
import { mapActions } from 'vuex'
export default { 	
  computed : {
    products() {
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