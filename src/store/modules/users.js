import api from "@/services/backend-api";
import { User } from "@/models/User";
import {
  // eslint-disable-next-line
  getDefaultPagination,
  commitPagination,
} from "@/utils/store-utils";


const state = {
  items: [],
  pagination: {},  
  user: new User()
};

const getters = {};

/* eslint-disable */
const actions = {

  getUserById ({ commit , dispatch }, id) {    

    if (id) {
      api.getData("users/" + id).then(
        res => {
          /* disable-next-line */
          //console.log("data",res.data);
          const user = res.data;
          commit("setUser", { user } );
          //dispatch("app/loadingState", { loading: false }, {root:true});
        },
        err => {
          console.log(err);
          
        }
      );
    } else {
      commit("setUser", { user: new User() });
      
    }
  },

  getAllUsers({ commit , dispatch }) {
    
   
    api.getData("users").then(res => {

      /* disable-next-line */
      console.log("data",res.data);
      //const customers = res.data;     

      commitPagination(commit, res.data);      

    })
  },
 
  deleteCustomer ({}, id ) {
    return api
      .deleteData("users/" + id.toString())
      .then(res => {
        return true;
      })
      .catch(err => {
        console.log(err);
        return false;
      });
  },

  saveUser({ commit, dispatch }, user) {
    if (!user.id) {
      
      delete user.id;
      
      return api
        .postData("users", user)
        .then(res => {
          const userCreated = res.data
          commit("setUser", { user : userCreated });
          return true;        
        })
        .catch(err => {
          console.log(err);
          return false;         
        });


    } else {
      
      return api
        .putData("users/" + user.id.toString(), user)
        .then(res => {          
          return true;         
        })
        .catch(err => {
          console.log(err);
          return false;     
        });
    }
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
  setUser (state, { user }) {
    state.user = user;
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
