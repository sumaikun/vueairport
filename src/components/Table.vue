<template>
  <div>
    <v-data-table class="elevation-1" 
      v-bind:headers="headers"
      v-bind:items="items"
      v-bind:search="search"  >    
     
      <!-- table options -->      
      
      <template v-slot:item="props">
         <tr> 
          <td  v-for="(header, index) in headers" :key="index" 
              :class="[ index === 0? 'text-xs-left': 'text-xs-center', 'body-2']" >
            <div v-if="header.value!=='' && header.value!=='crudButtons'" >            
              {{renderData(props.item, header)}}
            </div>
            <div v-else>            
              <v-btn class="teal iconButtons" title="editar" fab small dark @click.native="$emit('edit', props.item)">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn class="cyan iconButtons" title="eliminar" fab small @click.native="$emit('remove', props.item)">
                <v-icon>delete</v-icon>
              </v-btn>
            </div>  
          </td>
        </tr>        

      </template>       
      
      <template slot="no-data">
        <span >
          <p class="pt-2 blue--text subheading">   <v-icon medium class="blue--text" >info</v-icon>Lo sentimos, aun no hay información disponible :(</p>
        </span>
      </template>
      

    </v-data-table> 
  </div>
</template>
<script>
/* eslint-disable */
export default {
  props: {
    headers: "",
    items: "",
    pagination: "",
  },
  data () {
    return {
      search: ""
    }
  },
  methods: {
    renderData: (item, header) => {
      let val = "";
      if (header.value.includes('.')) {
        const vals = header.value.split('.')
        val = vals.reduce((acc, val) => acc[val], item)
      } else {
        val = item[header.value]
      }
      if (typeof val === "boolean") {
        val = val ? "Yes" : "No";
      }
      return val;
    }
  },
  computed: {
    isNotEmpty () {
      return this.items && this.items.length > 0;
    }
  }
}
</script>
<style>
    .iconButtons{
        margin:10px;
    }
</style>
