<template>
<div class="container">
  <ProductDetail v-for="(product, index) in products" :product="product" :key="index" v-if="product.category == 'cloth'" />  
</div>   
</template>
<script>
import ProductDetail from '@/components/ProductDetail'
export default {
  props: ['products'],
  components: {
    ProductDetail
  }
} 
</script>
