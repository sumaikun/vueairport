<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        
        <v-snackbar v-model="snackbar" :timeout="timeout" :top="true" >
          {{ textResponse }}
          <v-btn color="blue" text @click="snackbar = false" >Cerrar</v-btn>
        </v-snackbar> 

        <v-row align="center" justify="center">
          <v-img
            :src="require('../assets/BrioLogo.png')"
            :lazy-src="require('../assets/BrioLogo.png')"
            aspect-ratio="3"
            class=""
            max-width="500"
            max-height="300"
            contain
          ></v-img>
        </v-row>
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="indigo darken-4"
                dark
                flat
              >
                <v-toolbar-title>Vip rooms</v-toolbar-title>
                <v-spacer />                
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="login">

                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="person"
                    autocomplete="off"
                    type="text"
                    v-model="username"
                    required
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="password"
                    required
                  />

                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="indigo darken-4" @click="login()">
                    <span style="color:white;" >Login</span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>      
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import auth from '../utils/auth'

  export default {
    name: 'Login',
    props: {
      source: String,
    },
    created (){
       this.snackbar = false;
       this.timeout = 5000;
       // eslint-disable-next-line no-console
       //console.log(this.$router);
    },
    data () {
      return {
        username:"",
        password:"",
        textResponse:"",
        snackbar:null,
        timeout: 0,       
      }
    },
    methods: {
      login () {
        // eslint-disable-next-line no-console
        //console.log(this.username, this.password);

        if(this.username.length == 0 ||  this.password.length == 0)
        {
          this.textResponse = "por favor ingrese los datos de usuario y contraseña"
          this.snackbar = true
          return; 
        } 

        this.$Progress.start()

        auth.login(this.username, this.password, (loggedIn, err) => {

          if(loggedIn){
            // eslint-disable-next-line no-console
            console.log("on component",loggedIn);
            this.$Progress.finish()
            this.textResponse = "Bienvenid@"
            this.snackbar = true
            // eslint-disable-next-line no-console
            console.log(this.$router)

            let self = this;

            window.setTimeout(function(){ 
              self.$router.push( self.$route.name == 'Login' ? '/bar'  : self.$route.path )
             }, 1000);
            

          }

          if(err){
             // eslint-disable-next-line no-console
            console.log("on component",err);            
            this.$Progress.fail()
            this.textResponse = "No se puede ingresar con los datos suministrados"
            this.snackbar = true
          }

        });

      }
    },
  }
</script>