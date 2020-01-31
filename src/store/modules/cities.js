//import api from "@/services/backend-api";
import { City } from "@/models/City";
import { crudApiHelper } from "@/utils/crud-methods"


const apiHelper = new crudApiHelper("cities","setCity",City);

const state = {
  items: [],
  pagination: {},
  city: new City()
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
  setCity (state,  object ) {
    state.city = object;
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
