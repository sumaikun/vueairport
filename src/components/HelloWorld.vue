<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex xs12>
        <!--
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        ></v-img>
        -->
        <v-img
          :src="require('../assets/BrioLogo.png')"
          :lazy-src="require('../assets/BrioLogo.png')"
          class="my-3"
          contain
          height="200"
        ></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">
          Bienvenido al sistema de control brio
        </h1>
        <p class="subheading font-weight-regular">
          En este sistema se controlaran el acceso a usuarios y los reportes del sistema.          
        </p>
      </v-flex>
   
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',

  data: () => ({
    
  }),
};
</script>
