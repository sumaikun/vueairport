const state ={
    loading:false
}

const actions = {

    loadingState({ commit }, data){
        commit("setLoading", data );
    }

}

const mutations = {

    setLoading (state,  load ) {
        state.loading = load;
    }

}

export default {
    namespaced: true,
    state,
    actions,
    mutations    
  };