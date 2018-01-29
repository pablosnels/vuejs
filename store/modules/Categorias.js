import axios from 'axios'
import Config from '../../config'


const defaultState = {
  listaCategorias: [],
  categoriaActual: {'id': 0, 'nombre': 'Categoría'}
};

const getters = {
  categorias: state => state.listaCategorias,
  categoriaActual: state => {state.categoriaActual;debugger}
};

const actions = {
  cambiarCateActual ({ commit, state }, cate) {
    commit('SET_CATE', cate)
  } 
};

const mutations = {
  SET_CATE (state, cate) {
    state.categoriaActual = cate
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
   }
};


export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};