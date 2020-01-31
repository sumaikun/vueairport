//import api from "@/services/backend-api";
import { Country } from "@/models/Country";
import { crudApiHelper } from "@/utils/crud-methods"


const apiHelper = new crudApiHelper("countries","setCountry",Country);

const state = {
  items: [],
  pagination: {},
  country: new Country()
};

const getters = {};

/* eslint-disable */
const actions = {

  getById ({ commit }, id) {
   
    return apiHelper.getById(commit,id);
   
  },

  getAll({ commit }) {    

    return apiHelper.getAll(commit);

  },
 
  delete ({}, id ) {

    return apiHelper.delete(id);
  
  },

  save({ commit }, country) {
    
    return apiHelper.save( commit, country, true )

  },


};
/* eslint-disable */

const mutations = {

  setItems (state, customers) {
    state.items = customers;
  },
  setPagination (state, pagination) {
    state.pagination = pagination;
  },
  setCountry (state,  object ) {
    state.country = object;
    console.log("state",state);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
