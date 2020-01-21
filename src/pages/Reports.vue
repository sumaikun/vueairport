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
                              v-model="transeqno"                    
                      ></v-text-field>
                               
                  </v-col>
                  <v-col  lg="6" md="12" sm="12" xs="12" cols="12">  
                    <v-row  justify="center" >
                      <v-btn color="primary" @click="filterFromTransaq()" x-large >
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
     
      </v-row>
      <br>

    </v-card>  

    <br>
   
    <v-card>

        <v-btn title="Descargar" class="green lighten-1 iconButtons"
         fab small dark @click.native="csvExport()">
            <v-icon>mdi-domain</v-icon>
        </v-btn>

        <v-card-title>
        Lista de transacciones efectuadas
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
          <template v-slot:item.card="{ item }">
            <span> {{ item.card.replace(/^.{14}/g, '**** **')  }} </span>
          </template>

        </v-data-table>
    </v-card>
   </v-container>
</template>

<script>
    /* eslint-disable */

  //import { mapState } from "vuex";

  export default {
    components:{     
    },
    created(){
      const getData = () => { this.$store.dispatch("businessEvents/getAllEvents") };
      this.timer = setInterval( getData, 10000)
    },
    computed:{
      items(){
        //return []
        return this.$store.state.businessEvents.items
      },
      
    },   
    data () {
      return {
        search: '',
        dialog: false,
        headers: [
          { text: 'Cliente', value: 'customer' },
          { text: 'Transacción', value: 'transaction' },   
          { text: 'Tarjeta', value: 'card' },
          { text: 'Estado', value: 'state' },             
          { text: 'Sala', value: 'lounge' },                  
          { text: 'Adultos acompañantes', value: 'adultC' },
          { text: 'Niños acompañantes', value: 'childC' },
          { text: 'Fecha', value: 'createdDate' },          
        ],
        filters: {        
          state: []
        },
        //picker: new Date().toISOString().substr(0, 10),
        //picker2: new Date().toISOString().substr(0, 10),
        picker: null,
        picker2: null,
        transeqno: null,
        timer: ''
      }
    },
    methods:{
     
      filterFromNodeDates(){
        console.log(this.picker);
        console.log(this.picker2);
        this.$store.dispatch("selectItemsRangeBetween2DatesQuery",{ date1:this.picker,date2:this.picker2});
        
      },
      filterFromTransaq(){

      },
      csvExport() {
      
        let arrData = this.items;
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += [
          Object.keys(arrData[0]).join(";"),
          ...arrData.map(item => Object.values(item).join(";"))
        ]
          .join("\n")
          .replace(/(^\[)|(\]$)/gm, "");

        const data = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", data);
        link.setAttribute("download", "report.csv");
        link.click();
      }

    },
    beforeMount(){
      //this.getItems()
    },
    beforeDestroy () {
      clearInterval(this.timer)
    }
   
    
  }
</script>