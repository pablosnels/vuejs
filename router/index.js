import Vue from 'vue'
import Router from 'vue-router'
import AddProductosPorCate from '@/components/AddProductosPorCate'
import VistaPrincipal from '@/components/VistaPrincipal'
// import Error from '@/components/Error'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/prods/:cate/add',
      name: 'AddProductosPorCate',
      component: AddProductosPorCate
    },
    {
      path: '/prods/:cate',
      name: 'VistaPrincipal',
      component: VistaPrincipal
    }

  ]
})
