import api from "@/services/backend-api";
import {
  // eslint-disable-next-line
  getDefaultPagination,
  commitPagination,
} from "@/utils/store-utils";


const state = {
  items: [],
  pagination: {},  
  startDate: null,
  endDate: null
};

const getters = {};

/* eslint-disable */
const actions = {

  getAllEvents({ commit }) {
    
    commit("app/loadingState", { loading: true });
    
    api.getData("businessEvents").then(res => {

      /* disable-next-line */
      console.log("data",res.data);
      //const customers = res.data;     

      commitPagination(commit, res.data);

      commit("app/loadingState", { loading: false });

    });

  },


  getEventsByDates({ commit }, dates ) {
    
    commit("app/loadingState", { loading: true });

    commit("setStartDate", dates.startDate);

    commit("setEndDate", dates.endDate);
    
    api.postData("businessEvents/filterDates",dates).then(res => {

      /* disable-next-line */
      console.log("data",res.data);
      //const customers = res.data;     

      commit("setItems", res.data);

      commit("app/loadingState", { loading: false });

    });

  },

};
/* eslint-disable */

const mutations = {

  setStartDate (state, startDate){
    state.startDate = startDate
  },
  setEndDate (state, endDate){
    state.endDate = endDate
  },
  setItems (state, businessEvents) {
    state.items = businessEvents;
  },
  setPagination (state, pagination) {
    state.pagination = pagination;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
