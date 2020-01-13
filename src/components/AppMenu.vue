<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      :expand-on-hover="true"
    >
      <v-list dense>
        
        <v-list-item @click="clickMenu('Dashboard')" router>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title >Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="clickMenu('Users')" router>
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title >Usuarios</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="clickMenu('Reports')" router>
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Reportes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="signOut()" router>
          <v-list-item-action>
            <v-icon>mdi-lock</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Cerrar sesión</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Vip rooms</v-toolbar-title>
    </v-app-bar>

    <v-content>
       <v-container        
        fluid
      >
        <router-view></router-view>          
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2019  APES, BRIO</span>
    </v-footer>
  </v-app>
</template>

<script>
  
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,      
    }),
    created () {
      this.$vuetify.theme.dark = true
    },
    methods:{
      clickMenu(route) {        
        this.$router.push({
          name: route
        });
      },
      signOut(){

        this.$swal({
                title: '¿Estas seguro de cerrar sesión?',
                text: "",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#424242',
                cancelButtonColor: '#ff7674',
                confirmButtonText: 'Si, adelante!',
                cancelButtonText: 'Cancelar'
                }).then((result) => {
                  if (result.value) {
                      this.$store.dispatch("user/logout");
                      window.location.reload();
                  }
        });          
       
      }
    }
  }
</script>
