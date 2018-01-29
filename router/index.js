import Vue from 'vue'
import Router from 'vue-router'
import AddProducto from '@/components/AddProducto'
import VistaPrincipal from '@/components/VistaPrincipal'
import EditProduct from '@/components/EditProduct'
import TextoLibre from '@/components/TextoLibre'
import Config from '@/components/Config'
import Gastado from '@/components/Gastado'
import Login from '@/components/Login'

import store from '../store/store.js'

Vue.use(Router)


var router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/prods/:cate/:super/add',
      name: 'AddProducto',
      component: AddProducto, 
      meta: { requiresAuth: true }
    },
    {
      path: '/prods/:cate',
      name: 'VistaPrincipal',
      component: VistaPrincipal, 
      meta: { requiresAuth: true }
    },
    {
      path: '/prod/:id',
      name: 'EditProduct',
      component: EditProduct, 
      meta: { requiresAuth: true }
    },
    {
      path: '/libre',
      name: 'TextoLibre',
      component: TextoLibre, 
      meta: { requiresAuth: true }
    },
    {
      path: '/config',
      name: 'Config',
      component: Config, 
      meta: { requiresAuth: true }
    },
    {
      path: '/gastado',
      name: 'Gastado',
      component: Gastado, 
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !store.state.logueado) {
    next({ path: '/login', query: { redirect: to.fullPath }});
  } else {
    next();
  }
});


export default router