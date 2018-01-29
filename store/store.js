import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Config from '../config'
import _ from 'lodash'


Vue.use(Vuex)

const state = {
  listaProductos: [],
  listaCategorias: [],
  listaSupermercados: [],
  categoriaActual: {'id': 0, 'nombre': 'Categoría'},
  filtroProductos: '',
  loading: false,
  superActual: {'id':0,'nombre':'Todos'},
  textoLibre: '',
  scrollPosition: 0,
  listaGastos: [],
  logueado: false,
  username:'',
  remember:false
}

const getters = {
  idLogged: state => state.logueado,
  getListaGastos: state => state.listaGastos,
  get_scroll_position: state => state.scrollPosition,
  get_producto: (state) => (id) => {
    id = parseInt(id)
    return state.listaProductos.find((item) => {
      return item.id === id
    })
  },
  productos: state => state.listaProductos,
  productosOrdenados: state => state.listaProductos, //state => _.orderBy(state.listaProductos, 'orden'),
  loading: state => state.loading,
  categorias: state => state.listaCategorias,
  categoriaActual: state => state.categoriaActual,
  filtroActual: state => state.filtroProductos,
  superActual: state =>  state.superActual,
  supermercados: state => state.listaSupermercados,
  getTextoLibre: state => state.textoLibre,
  productosFiltrados: state =>
    state.listaProductos.filter(item => {
      return (
        (item.cant > 0) &&
        (item.cate === state.categoriaActual.id || state.categoriaActual.id === 0) &&
        (item.super === state.superActual.id || state.superActual.id === 0 || item.super ===0 ) &&
        (this.filtroProductos === '' ||
          item.desc.toUpperCase().indexOf(state.filtroProductos) > -1)
      )
    })
    .sort((a, b) => a.orden > b.orden ? 1 : -1),
  pendienteCompraEstablecimiento (state,getters) {
    var cant =0;
    getters.productosFiltrados.forEach(function (prod) {
      cant += (prod.cant * prod.precio);
  });
    return Math.floor(cant * 100) / 100 ;
  },
  productosYaComprados: state =>
  state.listaProductos.filter(item => {
      return (item.cant === 0 && (item.cate === state.categoriaActual.id || state.categoriaActual.id === 0) &&
             (item.super === state.superActual.id || state.superActual.id === 0)
      )
    }),
  prodByDesc: state => desc => {
    return state.listaProductos.find(prod => prod.desc === desc)
  },
  prodByCate: state => cate => {
    cate = parseInt(cate)
    return state.listaProductos.find(prod => prod.cate === cate)
  },
  prodByCatePendientes: state => cate => {
    cate = parseInt(cate)
    return state.listaProductos.filter(
      prod => (prod.cate === cate) && prod.cant && (prod.super === state.superActual.id || state.superActual.id === 0)
    ).length
  },
  prodBySuperPendientes: state => superId => {
    superId = parseInt(superId)  
    var res= state.listaProductos.filter(
        prod => ((prod.super === superId) || (!superId)) && prod.cant > 0
      ).length  
      return res;  
  },
  porcCompraActual: state =>
    state.listaProductos.filter(item => {
      return item.cant === 0
    }).length,
  totalCompra: state => state.listaProductos.length,
  logueadoLocal: state => {
    var jwt = localStorage.getItem('userNameCompras')
    state.username = jwt
    state.logueado = jwt != ''
    return state.logueado
  }
}

const actions = {
  leerLoginLocalStorage({ dispatch, commit, state }){
    
    
  },
  logout({ dispatch, commit, state }){
     
     state.logueado = false
     state.username = ''
     localStorage.removeItem('userNameCompras')
  },
  login({ dispatch, commit, state }, usuario){
    
     state.logueado = true
     state.username = usuario.user
     state.remember = usuario.remember
     if (state.logueado && state.remember)
     {
      localStorage.setItem('userNameCompras', state.username)
//      localStorage.removeItem('username')
     }
  },
  guardarScrollPosition({ dispatch, commit, state },position){
    commit('SCROLL',position)
  },
  resetCompraCero({ dispatch, commit, state }){
    commit('RESET_0')
    console.log('Guardar')
     dispatch('guardarProductosCloud')
  },
  resetCompra({ dispatch, commit, state }){
    console.log('RESET') 
    commit('RESET')
    console.log('Guardar')
     dispatch('guardarProductosCloud')
  },
  guardarProductosCloud({ dispatch, commit, state }) {
    commit('SET_LOADING',true)
    var listaOrdenada=  state.listaProductos.sort((a, b) => a.orden > b.orden ? 1 : -1);
    axios
    .put(Config.urlProductos, listaOrdenada)
    .then(response => {
      console.log('saved successfully')
      commit('SET_LOADING',false)
    })
  },
  guardarProductoModi ({ dispatch, commit, state }, objetoPayload) {
    commit('ORDEN_PROD', objetoPayload)
    dispatch('guardarProductosCloud')
  },
  guardarProd ({ commit, state }, objetoPayload) {
    if (objetoPayload) {
      commit('SET_LOADING',true)
      objetoPayload.id = Math.max(...state.listaProductos.map(o => o.id? o.id: 0)) + 1;
      commit('ADD_PROD', objetoPayload)
    }
    axios
      .put(Config.urlProductos, state.listaProductos)
      .then(response => {
        console.log('saved successfully')
        commit('SET_LOADING',false)
      })
  },
  cargarDatos ({ commit, state }) {
    commit('SET_LOADING',true)
    commit('GET_PRODS')
    commit('GET_CATES')
    commit('GET_SUPER')
    commit('GET_TEXTO_LIBRE')
    commit('GET_GASTOS')
    commit('SET_LOADING',false)
  },
  cambiarFiltro ({ commit, state }, filtro) {
    commit('SET_FILTER', filtro)
  },
  eliminarProducto ({ commit, state }, aProd) {
    commit('SET_LOADING',true)
    commit('DEL_PROD', aProd)
    console.log('Commit del Elimino ' + aProd)
    axios
    .put(Config.urlProductos, state.listaProductos)
    .then(response => {
      console.log('saved successfully')
      commit('SET_LOADING',false)
    })
  },
  cambiarCateActual ({ commit, state }, cate) {
    commit('SET_CATE', cate)
  },
  cambiarSuper ({ commit, state }, superm) {
    commit('SET_SUPER', superm)
  },
  guardarTextoLibre  ({ commit, state }, texto) {
    commit('SET_LOADING',true)
    commit('SET_TEXTO_LIBRE', texto)
    var obj = {'texto': texto}
    axios
    .put(Config.urlTextoLibre, obj)
    .then(response => {
      commit('SET_LOADING',false)
    })
  },
  guardarGastos  ({ commit, state }, gastos) {
    commit('SET_LOADING',true)
    commit('SET_GASTOS', gastos)
    axios
    .put(Config.urlGastos, state.listaGastos)
    .then(response => {
      commit('SET_LOADING',false)
    })
  },
  eliminarGasto  ({ commit, state }, index) {
    commit('DEL_GASTO', index)
    axios
    .put(Config.urlGastos, state.listaGastos)
    .then(response => {
      commit('SET_LOADING',false)
    })
  },
  addGasto  ({ commit, state }, gasto) {
    
    commit('ADD_GASTO', gasto)
    axios
    .put(Config.urlGastos, state.listaGastos)
    .then(response => {
      commit('SET_LOADING',false)
    })
  }
}

const mutations = {
  LOGIN(state, usuario){
    
    state.logueado = usuario.ok
     state.username = usuario.user
     if (state.logueado && state.remember)
     {
     
      localStorage.setItem('username', usuario.user)
    }
  },
  ADD_GASTO (state, gasto) {
    state.listaGastos.push(gasto);
  },
  DEL_GASTO (state, index)
  {
    if (index == state.listaGastos.length)
    {
     state.listaGastos.splice(0,state.listaGastos.length)
    }
    else{
    state.listaGastos.splice(index,1)
    }
  },
  SET_GASTOS (state, gastos)
  {
    state.listaGastos = gastos
  },
  SCROLL (posit) {
    state.position = posit
  },
  RESET (state) {
    for (var i = 0, len = state.listaProductos.length; i < len; i++) {
      state.listaProductos[i].cant = state.listaProductos[i].mensual
     }
  },
  RESET_0 (state) {
    for (var i = 0, len = state.listaProductos.length; i < len; i++) {
      state.listaProductos[i].cant = 0
     }
  },
  SET_TEXTO_LIBRE (state, texto) {
    state.textoLibre = texto
  },
  ORDEN_PROD (state, productos) {
    if (productos.first.orden >= productos.second.orden){
      productos.first.orden = productos.second.orden
      productos.second.orden =  productos.first.orden + 1}
      else {
      productos.first.orden = productos.second.orden
      productos.second.orden =  productos.first.orden -1}
  },
  ADD_PROD (state, prod) {
    state.loading = true
    state.listaProductos.push(prod)
    state.loading = false
  },
  MODI_PROD (state, prod) {
    var produ = state.listaProductos.find(element => element.nombre === prod.nombre);
    if (produ)
       {produ.orden = prod.orden,
        console.log('MOdi' + prod)
       }
  },
  DEL_PROD (state, prod) {
    state.listaProductos = state.listaProductos.filter(item => { return item.desc !== prod.desc })
    console.log('Elimino ' + prod)
  },
  GET_PRODS (state) {
    state.loading = true
    axios
      .get(Config.urlProductos)
      .then(response => {
        state.listaProductos = response.data
        /*var aOrden = 100
        state.listaProductos.forEach(function (prod) {
          prod.orden = aOrden
          aOrden +=100
        })*/
        state.loading = false
      })
      .catch(e => {
        console.log(e)
        state.loading = false
      })
  },
  GET_TEXTO_LIBRE (state) {
    state.loading = true
    axios
      .get(Config.urlTextoLibre)
      .then(response => {
        state.textoLibre = response.data.texto
        state.loading = false
      })
      .catch(e => {
        console.log(e)
        state.loading = false
      })
  },
  GET_CATES (state) {
    state.loading = true
    axios
      .get(Config.urlCategorias)
      .then(response => {
        state.listaCategorias = response.data
        state.listaCategorias.push({ id: 0, nombre: 'Todas' })
        state.loading = false
      })
      .catch(e => {
        console.log(e)
        state.loading = false
      })
  },
  GET_SUPER (state) {
    state.loading = true
    axios
      .get(Config.urlSupermercados)
      .then(response => {
        state.listaSupermercados = response.data
        state.listaSupermercados.push({ id: 0, nombre: 'Todos' })
        state.loading = false
        state.superActual = state.listaSupermercados[0]
      })
      .catch(e => {
        console.log(e)
        state.loading = false
      })
  },
  GET_GASTOS (state) {
    state.loading = true
    axios
      .get(Config.urlGastos)
      .then(response => {
        state.listaGastos = response.data
        state.loading = false
      })
      .catch(e => {
        console.log(e)
        state.loading = false
      })
  },
  SET_FILTER (state, filter) {
    state.filtroProductos = filter
  },
  SET_CATE (state, cate) {
    state.categoriaActual = cate
  },
  SET_SUPER (state, superm) {
    state.superActual = superm
  },
  SET_LOADING (state, loading) {
    state.loading = loading
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
