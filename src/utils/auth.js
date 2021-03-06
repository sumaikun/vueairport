/* globals Store */



import api from "../services/backend-api.js"

export default {
  login (username, password, cb){

    api.login('authenticate',  { username, password } ).then((res) => {

      /* eslint-disable-next-line */
      console.log("verify role",res.data.role.length);

      if(res.data.role[0].authority == "ROLE_USER" )
      {        
        if (cb) cb(false, true); 
        return;       
      }


      const token = res.data.token
      const user = { ROLE :  res.data.role[0].authority }
      // eslint-disable-next-line no-console
      //console.log("token",token);

      Store.dispatch('user/updateUser', {user , token})      
     
      if (cb) cb(true, null)

    }, (err) => {
      // eslint-disable-next-line no-console
      console.log(err)
      if (cb) cb(false, err)

    })

  },
  getToken () {
    return Store.state.user.token
  },
  logout (cb) {
    // delete localStorage.token
    // Store.commit('setToken', null)
    Store.dispatch('user/logout')
    if (cb) cb(false)
    this.onChange(false)
  },
  loggedIn () {
    // eslint-disable-next-line no-console
    //console.log(Store.state.user.token);
    // eslint-disable-next-line no-console
    //console.log(!!Store.state.user.token);
    return !!Store.state.user.token
  },
  onChange () {}
}
