<template>
  <v-app>    
    <v-content>
  


    <div class="area" >
            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >

      <vue-progress-bar></vue-progress-bar>
      <template v-if="!loggedIn || this.$route.name == 'Login' ">
        <Login/>
      </template>
      <template v-if="loggedIn && this.$route.name != 'Login' ">
        <AppMenu/>
      </template>
    </v-content>
  </v-app>
</template>

<script>

import auth from "./utils/auth";
import AppMenu from './components/AppMenu';
import Login from './components/Login';
export default {
  name: 'App',
  components: {  
    AppMenu,
    Login
  },
  created (){
    //this.loggedIn = auth.loggedIn();
    this.$vuetify.theme.dark = true;    
    
    //this.$Progress.start();
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress;
        // parse meta tags
        this.$Progress.parseMeta(meta);

      }
      //  start the progress bar
      this.$Progress.start();
      //  continue to next page
      next();
    });
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to) => {
      if (to.name !== "ErrorPage") {
        this.menuItem = to.name;
      }
      //  finish the progress bar
      this.$Progress.finish();
    });

  },
  computed:{

    loggedIn(){
      // `this` points to the vm instance
      return auth.loggedIn();
    }
    
  },
  data(){
    return{
      
    }    
  },
  mounted(){
    // eslint-disable-next-line no-console
    console.log("i had been mounted ",this.$route);
  },
  methods:{

    //progress bar methods attemp
    start () {
        this.$Progress.start()
    },
    set (num) {
        this.$Progress.set(num)
    },
    increase (num) {
        this.$Progress.increase(num)
    },
    decrease (num) {
        this.$Progress.decrease(num)
    },
    finish () {
        this.$Progress.finish()
    },
    fail () {
        this.$Progress.fail()
    },
    test(){
      this.$Progress.start()

      this.$http.jsonp('http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=7waqfqbprs7pajbz28mqf6vz')
      .then(() => {
          this.$Progress.finish()
      }, () => {
          this.$Progress.fail()
      })
    }
  }
};
</script>
<style>
  @import './assets/styles/animatedBackground.css';
</style>

