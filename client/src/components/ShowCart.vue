<template>
<div class="container">

	<h1>Shopping Cart {{ user.name }}</h1><hr>
	<table class="table table-striped table-hover table-bordered">
        <tbody>
            <tr>
                <th>Item Name</th>
                <th>QTY</th>
                <th>Unit Price</th>
                <th>Total Price</th>
            </tr>
            <tr v-for="(cart,index) in user.cart">
                <td> {{ cart.productName }} </td>
                <td> {{ cart.total }} <a href="#">X</a></td>
                <td>$ {{ cart.product.price }}</td>
                <td>$ {{ cart.subtotal }} </td>
            </tr>
            <tr>
                <th colspan="3"><span class="pull-right">Sub Total</span></th>
                <th>$ {{ subtotal }}</th>
            </tr>
            <tr>
                <th colspan="3"><span class="pull-right">TAX 10%</span></th>
                <th>$ {{ tax }}</th>
            </tr>
            <tr>
                <th colspan="3"><span class="pull-right">Total</span></th>
                <th>$ {{ finalTotal }}</th>
            </tr>
            <tr>
                <router-link to="/product"> 
                    <td><a href="#" class="btn btn-primary">Continue Shopping</a></td>
                 </router-link>   
                <td colspan="3"><a @click="checkout" href="#" class="pull-right btn btn-success">Checkout</a></td>
            </tr>
        </tbody>
    </table>          
      
</div>	
</template>

<script>
import { mapActions } from 'vuex'
export default {
	computed: {
		user () {
			return this.$store.state.user
		},
        subtotal () {
            return this.$store.state.subtotal
        },
        tax () {
            return this.$store.state.tax
        },
        finalTotal () {
            return this.$store.state.finalTotal
        }        
	},
    methods : {
        ...mapActions([
            'getSubTotal',
            'checkoutCart'
            ]),
        checkout: function () {
            this.checkoutCart()
        }
    },
    created () {
        this.getSubTotal()
    }
}	
</script>