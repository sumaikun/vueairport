<template>
  <v-container fluid>

    <v-snackbar v-model="snackbar" :timeout="timeout" :top="true" >
        <span class="red--text" >{{ textResponse }}</span>
        <v-btn color="blue" text @click="snackbar = false" >Cerrar</v-btn>
    </v-snackbar> 


    <v-flex xs12>
      <v-card class="elevation-0">
        <v-card-title class="title">
          <span style="margin-left:15pt" >{{title}}</span>
          <v-spacer></v-spacer>
          <v-btn fab small class="grey iconButtons" @click.native="cancel()">
            <v-icon>cancel</v-icon>
          </v-btn>
          &nbsp;
          <v-btn fab small class="red iconButtons" @click.native="save()">
            <v-icon>save</v-icon>
          </v-btn>
        </v-card-title>

         <Loading></Loading>

        <v-card-text>
          <v-container fluid grid-list-sm>
            <v-layout row wrap>            
              <v-flex md12 sm12>
                <v-container fluid grid-list-sm>
                  <v-layout row wrap>
                    <v-flex md12 sm12 xs12  class="mx-1 px-0">
                      <v-text-field name="username" label="Usuario del sistema" autocomplete="off"
                       v-model="user.username"
                       hint="usuario del sistema es un dato obligatório" value="" 
                        class="input-group--focused" required></v-text-field>
                    </v-flex>
                    <v-flex md12 sm12  class="mx-1 px-0">
                      <v-text-field name="password" label="Contraseña" type="password" minlegth="8"
                       v-model="password" hint="Porfavor ingrese una contraseña, minimo 8 dígitos" value=""
                       v-bind:rules="rules.password" 
                       class="input-group--focused" required></v-text-field>
                    </v-flex>
                    <v-flex md12 sm12  class="mx-1 px-0">
                      <v-text-field name="confirmPassword" label="Confirmar contraseña" type="password"
                       v-model="confirmPassword" v-bind:rules="rules.confirmPassword"
                       minlegth="8" hint="Aquí confirma la contraseña" value="" 
                        class="input-group--focused" required></v-text-field>
                    </v-flex>
                    <v-flex md5 sm12  xs12 class="mx-1 px-0">
                      <v-text-field name="name" type="text" autocomplete="off" label="Nombre de usuario" value=""
                       v-model="user.name"
                       class="input-group--focused" required></v-text-field>
                    </v-flex> 
                    <v-flex md5 sm12  xs12 class="mx-1 px-0">
                      <v-text-field name="secondname" type="text" autocomplete="off" label="Apellido de usuario" value=""
                       v-model="user.secondname"
                       class="input-group--focused" required></v-text-field>
                    </v-flex> 
                    <v-flex md6 sm12  xs12 class="mx-1 px-0">
                      <v-text-field name="email" type="email" utocomplete="off" label="Correo electrónico" value=""
                       v-model="user.email"  v-bind:rules="rules.email"
                        class="input-group--focused" required></v-text-field>
                    </v-flex>                 
                    <v-flex md12 sm12  class="mx-1 px-0">
                      <v-switch label="Es administrador" v-model="user.isAdmin" light></v-switch>
                    </v-flex>
                    <v-flex md12 sm12  class="mx-1 px-0">
                        <h3>Gestión de permisos</h3>
                    </v-flex>
                   
                        <v-flex md2 sm12  xs4 v-for="(item, index) in rooms" v-bind:key="index" class="mx-1 px-0">
                            <v-checkbox 
                              v-model="roomsSelected" :value="item.id" :label="item.name"></v-checkbox>
                         </v-flex> 

                      

                  </v-layout>
                </v-container>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

      </v-card>
    </v-flex>

  </v-container>
</template>
<script>


  import Loading from "@/components/Loading.vue";

  import { mapState } from 'vuex'

  export default {
    components:{
      Loading
    },
    data() {
      return {
        roomsSelected: [],
        title: '',
        statusValidation: [],
        password:'',
        confirmPassword:'',
        rules: {        
          email: [() => {
            /* eslint-disable no-useless-escape */
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (this.user && !re.test(this.user.email)) {
              this.statusValidation[0] = false
              return 'Correo es invalido.'
            }
            else{
              this.statusValidation[0] = true
              return true;
            }
            
          }],
          password:[() => {
            if( this.password.length < 8 && this.password.length > 0 ){
              this.statusValidation[1] = false
              return 'Deben haber al menos 8 digitos para la contraseña'
            }
            else{
              this.statusValidation[1] = true
              return true;
            }
          }],
          confirmPassword:  [() => {
            /* eslint-disable no-useless-escape */
            if (this.password  !== this.confirmPassword ) {
              this.statusValidation[2] = false
              return 'Las contraseñas no coinciden.'
            }
            else{
              this.statusValidation[2] = true
              return true;
            }           
            
          }],
        },

        textResponse:"",
        snackbar:null,
        timeout: 0, 

      }
    },
    computed: {
      ...mapState('users', {     
        user: 'user',
        loading: 'loading',    
      }),
      rooms(){
        return this.$store.state.rooms.items;
      }
    },
    methods: {

      save() {
        
          const user = { ...this.user }
          // delete order.customer
          /* eslint-disable-next-line */
          const userKeys = Object.keys(user)

          /* eslint-disable-next-line */
          console.log(this.statusValidation)

          let objectValidity = true

          userKeys.forEach(  key => {

              /* eslint-disable-next-line */
              //console.log(key)
              if( key !== "id" &&  key !== "password" &&  key !== "isAdmin" 
              && key!=="createdDate" && key!=="lastModifiedDate" && key!=="permissions" )
              {
                /* eslint-disable-next-line */
                console.log(user[key],key)
                if(user[key].length == 0)
                {
                    objectValidity = false
                }
              }

          })

          if(!objectValidity)
          {
            this.textResponse = " Error: Por favor ingrese todos los campos"
            this.snackbar = true
            return; 
          }

          if(!this.statusValidation[1] && this.password.length>0)
          {
            this.textResponse = " Error: Ingrese una contraseña valida para continuar"
            this.snackbar = true
            return; 
          }

          if(!this.statusValidation[0] || !this.statusValidation[2])
          {
            this.textResponse = " Error: Porfavor verifique la validación de los campos"
            this.snackbar = true
            return; 
          }else{
            user.password = this.password
            user.isAdmin === null ? user.isAdmin = false : false
          }

          if(this.roomsSelected.length > 0 )
          {
            user.permissions = this.roomsSelected;
          }

          this.$store.dispatch('users/saveUser', user).then( (data) =>{
            /* eslint-disable-next-line */
            if(data)
            {
              this.$swal({icon:'success',title: '!Datos registrados!'})
            }else{
              this.$swal({icon:'error',title: '!Hay error en la conexión con el servidor!'})
            }
            
          })

      },
      cancel() {
        this.$router.push({ name: 'Users' })
      }
    },
    created() {

      this.statusValidation = [];      
      //if (this.$route.params.id) {
        this.$store.dispatch("users/getUserById",this.$route.params.id);       
      //}
      this.$store.dispatch("rooms/getAll"); 

    },
    mounted() {
      if (this.$route.params.id) {
        this.title = 'Editar Usuario'
      } else this.title = 'Nuevo Usuario'
    },
    watch:{
      user(val){
        /* eslint-disable-next-line */
        console.log(val.permissions);
        if(val.permissions && this.roomsSelected.length === 0)
        {
          /* eslint-disable-next-line */
          console.log("generate info");

          val.permissions.forEach(element => {
            this.roomsSelected.push(element);
          });

        }
      }
    }
  }
</script>
<style>
    .iconButtons{
        margin:10px;
    }
</style>
