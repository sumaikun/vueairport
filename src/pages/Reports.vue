<template>

   <v-container> 
  
    <v-card style="background-color:rgba(66,66,66,0.5);" >
      <v-container fluid>
        <div>
          <h3>Filtros:</h3>
          
              <v-row>  
                  <v-col  lg="6" md="12" sm="12" cols="12">
                    
                      <v-text-field                      
                              label="Número de transacción"  
                              v-model="sku"                    
                      ></v-text-field>
                               
                  </v-col>
                  <v-col  lg="6" md="12" sm="12" xs="12" cols="12">  
                    <v-row  justify="center" >
                      <v-btn color="primary" @click="filterFromNodeSkus()" x-large >
                        Filtrar transacción
                      </v-btn>  
                    </v-row>       
                  </v-col>
              </v-row>
              
          
            <v-row> 

             <v-col  lg="6" md="6" sm="12">
               <v-row  align="center" justify="center" > 
                <v-date-picker v-model="picker"></v-date-picker>
               </v-row> 
              </v-col>
              <v-col  lg="6" md="6" sm="12">
                <v-row  align="center" justify="center" >
                  <v-date-picker v-model="picker2"></v-date-picker>
                </v-row>
              </v-col>

            </v-row>
          
        </div>
      </v-container>  
  

      <v-row>   
        <v-col  lg="12" md="12" sm="12">
          <v-row  justify="center" >
            <v-btn color="primary" @click="filterFromNodeDates()" x-large >Filtrar por fechas</v-btn>
          </v-row>
        </v-col>
        <!--
        <v-col  lg="6" md="6" sm="12">
          <v-row  justify="center" >
            <v-btn color="primary" @click="getItems()" x-large >Traer todos los datos</v-btn>
          </v-row>  
        </v-col>
        -->
      </v-row>
      <br>

    </v-card>  

    <br>
   
    <v-card>
        <v-card-title>
        Trazabilidad
        <div class="flex-grow-1"></div>
        <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
        </v-card-title>        

        <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        >      
       

        <!-- table options -->
          <template v-slot:item.button_action="{ item }">
            <v-btn color="primary" @click="trackItem(item)" >traz.</v-btn>
          </template>

        
        </v-data-table>
    </v-card>
   </v-container>
</template>

<script>
    /* eslint-disable */

  export default {
    components:{     
    },
    computed:{
      items(){
        return []
        //return this.$store.state.items
      },
      isFetching(){
          return false
          //return this.$store.state.isFetching
      },
      tracks(){
          return []
          //return this.$store.state.tracks
      }
    },
    data () {
      return {
        search: '',
        dialog: false,
        headers: [
          { text: 'Cliente', value: 'customer' },
          { text: 'Transacción', value: 'state' },   
          { text: 'Tarjeta', value: 'card' },
          { text: 'Estado', value: 'ubication' },             
          { text: 'Sala', value: 'ubication' },                  
          { text: 'Adultos acompañantes', value: 'description' },
          { text: 'Niños acompañantes', value: 'description' },
          { text: 'Fecha', value: 'timefield' },          
        ],
        filters: {
          sku: [],
          state: []
        },
        //picker: new Date().toISOString().substr(0, 10),
        //picker2: new Date().toISOString().substr(0, 10),
        picker: null,
        picker2: null,
        sku:""
      }
    },
    methods:{
      getItems: function() {
        this.$store.dispatch('getItems');
      },
      trackItem(item)
      {
        console.log(item);
        this.dialog = true;
        this.$store.dispatch('getTracks',item.epc);
      },
      columnValueList(val) {
        return this.items.map(d => d[val])
      },
      filterFromNodeSkus(){
        console.log(this.sku);
        
        let query = "";
        
        if(this.sku)
        {
          console.log("enviar sku");
          query = "filter[where][sku]="+this.sku;
        }       

        if(query != "")
        {
          this.$store.dispatch('getItemsWithFilter',query);
        }        

      },
      filterFromNodeDates(){
        console.log(this.picker);
        console.log(this.picker2);
        this.$store.dispatch("selectItemsRangeBetween2DatesQuery",{ date1:this.picker,date2:this.picker2});
        
      }      
    },
    beforeMount(){
      //this.getItems()
    },
   
    
  }
</script>