import api from "@/services/backend-api";
import {
  // eslint-disable-next-line
  getDefaultPagination,
  commitPagination,
} from "@/utils/store-utils";


const state = {
  items: [],
  pagination: {},
  loading: true,
};

const getters = {};

/* eslint-disable */
const actions = {


  getAllEvents({ commit }) {
    
    commit("setLoading", { loading: true });
    
    api.getData("businessEvents").then(res => {

      /* disable-next-line */
      console.log("data",res.data);
      //const customers = res.data;     

      commitPagination(commit, res.data);

      commit("setLoading", { loading: false });

    });

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
  setLoading (state, { loading }) {
    state.loading = loading;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
