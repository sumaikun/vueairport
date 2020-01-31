//import api from "@/services/backend-api";
import { Room } from "@/models/Room";
import { crudApiHelper } from "@/utils/crud-methods"


const apiHelper = new crudApiHelper("rooms","setRoom",Room);

const state = {
  items: [],
  pagination: {},
  room: new Room()
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
  setRoom (state,  object ) {
    state.room = object;
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
