<template>
<div class="container">
	<ProductDetail v-for="(product, index) in products" :product="product" :key="index" />
</div>	
</template>

<script>
import { mapActions } from 'vuex'
import ProductDetail from '@/components/ProductDetail'
export default {
  props: ['products'],
  components: {
  	ProductDetail
  },   	
}	
</script>