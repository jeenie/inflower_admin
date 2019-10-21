import Vue from 'vue'
import Vuex from 'vuex'

import business from "./modules/business";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    version: 'b2b',
    country: 'sg'
  },
  getters: {
    getVersion: (state) => {
      return state.version;
    },
    getCountry: (state) => {
      return state.country;
    }
  },
  mutations: {
    changeVersion (state, version) {
      state.version = version;
    },
    changeCountry (state, country) {
      state.country = country;
    }
  }
})
