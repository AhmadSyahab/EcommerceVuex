import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Product from '@/components/Product'
import Admin from '@/components/Admin'
import GetAllProduct from '@/components/GetAllProduct'
import AllShoes from '@/components/AllShoes'
import AllCloth from '@/components/AllCloth'
import ShowCart from '@/components/ShowCart'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Welcome
    },
    {
      path: '/product',
      component: Product,
      children: [
        {
          path: '',
          name: GetAllProduct,
          component: GetAllProduct 
        },
        {
          path: 'shoes',
          component: AllShoes
        },
        {
          path: 'cloth',
          component: AllCloth
        }        
      ]
    },
    {
      path: '/admin',
      component: Admin
    },
    {
      path: '/showcart',
      component: ShowCart
    }
  ]
})
