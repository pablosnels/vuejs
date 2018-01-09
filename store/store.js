import Vue from 'vue'
import Vuex from 'vuex';
import axios from 'axios';
import Config from '../config';
import _ from 'lodash';

Vue.use(Vuex);

const state = {
  listaProductos: [],
  listaCategorias: [],
  categoriaActual: 0,
  filtroProductos: "",
  loading: false,
  modoConsulta: "C"
};

const getters = {
  productos: state => state.listaProductos,
  productosOrdenados: state => _.orderBy(state.listaProductos, "orden"),
  loading: state => state.loading,
  categorias: state => state.listaCategorias,
  categoriaActual: state => state.categoriaActual,
  filtroActual: state => state.filtroProductos,
  modoConsulta: state => state.modoConsulta,
  productosFiltrados: state =>
    state.listaProductos.filter(item => {
      return (
        (item.cant > 0 || state.modoConsulta === "M") &&
        (item.cate === state.categoriaActual || state.categoriaActual === 0) &&
        (this.filtroProductos === "" ||
          item.desc.toUpperCase().indexOf(state.filtroProductos) > -1)
      )
    }),
  productosYaComprados: state =>
    state.listaProductos.filter(item => {
      return (
        (item.cate === state.categoriaActual || state.categoriaActual === 0) &&
        item.cant === 0
      )
    }),
  prodByDesc: state => desc => {
    return state.listaProductos.find(prod => prod.desc === desc)
  },
  prodByCate: state => cate => {
    return state.listaProductos.find(prod => prod.cate === parseInt(cate))
  },
  prodByCatePendientes: state => cate => {
    return state.listaProductos.filter(
      prod => prod.cate === parseInt(cate) && prod.cant
    ).length
  },
  porcCompraActual: state =>
    state.listaProductos.filter(item => {
      return item.cant === 0;
    }).length,
  totalCompra: state => state.listaProductos.length
};

const actions = {
  guardarProd({ commit, state }, objetoPayload) {
    if (objetoPayload) {
      commit("ADD_PROD", objetoPayload)
    }
    axios
      .put(Config.urlProductosGuardar, state.listaProductos)
      .then(response => {
        console.log("saved successfully")
        state.loading = false
      });
  },
  cargarDatos({ commit, state }) {
    commit("GET_PRODS")
    commit("GET_CATES")
  },
  cambiarFiltro({ commit, state }, filtro) {
    commit("SET_FILTER", filtro)
  },
  eliminarProducto({ commit, state }, aProd) {
    commit("DEL_PROD", aProd)
    console.log("Commit del Elimino " + aProd)

    axios
    .put(Config.urlProductosGuardar, state.listaProductos)
    .then(response => {
      console.log("saved successfully")
      state.loading = false
    });
    
  },
  cambiarCateActual({ commit, state }, cate) {
    commit("SET_CATE", cate)
  }
};

const mutations = {
  ADD_PROD (state, prod) {
    state.loading = true
    state.listaProductos.push(prod)
    console.log('Agregado' + prod)
  },
  DEL_PROD (state, prod) {
    state.listaProductos = state.listaProductos.filter(item => {return item.desc != prod.desc} )
    console.log('Elimino ' + prod)
  },
  GET_PRODS (state) {
    state.loading = true;
    axios
      .get(Config.urlProductos)
      .then(response => {
        state.listaProductos = response.data
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
        state.listaCategorias.push({ id: '0', nombre: 'Todas' })
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
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
