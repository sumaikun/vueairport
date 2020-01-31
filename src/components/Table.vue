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
               
                <span v-if="header.type !== 'relationship' && header.type !== 'image' " >
                  {{ renderData(props.item, header) }}
                </span>

                <span v-if="header.type === 'relationship' " >
                  {{ solverRelationShip(props.item, header.dataSet, header.value) }}
                </span>

                <div v-if="header.type === 'image' " style="margin:0.1px" >
                  <v-img :src="renderData(props.item, header)" aspect-ratio="3" width="350"></v-img>
                </div>

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
    },
    solverRelationShip: (item, dataSet, property) => {
      /* eslint-disable-next-line */
      console.log(dataSet);

      const result = dataSet.filter( data => data.id === item[property] )

      try{
        return result[0].name
      }catch(e){
        return ""
      }
      

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
