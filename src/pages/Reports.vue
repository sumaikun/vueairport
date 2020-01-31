<template>

   <v-container> 
  
    <v-card style="background-color:rgba(66,66,66,0.5);" >
      <v-container fluid>
        <div>
          <h3>Filtros:</h3>

            <!--
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
            -->  
          
            <v-row> 

             <v-col  lg="6" md="6" sm="12">
               <v-row  align="center" justify="center" > 
                <v-date-picker v-model="startDate"></v-date-picker>
               </v-row> 
              </v-col>
              <v-col  lg="6" md="6" sm="12">
                <v-row  align="center" justify="center" >
                  <v-date-picker v-model="endDate"></v-date-picker>
                </v-row>
              </v-col>

            </v-row>
          
        </div>
      </v-container>  
  

      <v-row>   
        <v-col  lg="12" md="12" sm="12">
          <v-row  justify="center" >
            <v-btn color="primary" @click="filterFromDates()" x-large >Filtrar por fechas</v-btn>
          </v-row>
        </v-col>
     
      </v-row>
      <br>

    </v-card>  

    <br>

    <Loading></Loading>
   
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
        :items=" itemsFiltered || items"
        :search="search"
        >     
           <!-- table options -->
          <template v-slot:item.card="{ item }">
            <span> {{ item.card.replace(/^.{14}/g, '**** **')  }} </span>
          </template>

          <template v-slot:item.state="{ item }">
            <span> {{ parseStates(item.state)  }} </span>
          </template>

        </v-data-table>
    </v-card>
   </v-container>
</template>

<script>
    /* eslint-disable */

  //import { mapState } from "vuex";

  import Loading from "@/components/Loading.vue"

  import moment from "moment"

  export default {
    components:{  
      Loading   
    },
    created(){

      if( this.$store.state.businessEvents.startDate != null  && 
       this.$store.state.businessEvents.startDate === this.$store.state.businessEvents.endDate &&
       this.$store.state.businessEvents.startDate === moment().format("YYYY-MM-DD") &&
         this.$route.params.type === null )
       {
         /* eslint-disable-next-line */
         console.log("condición cumplida");

          const getData = ()=>{ this.$store.dispatch("businessEvents/getEventsByDates",{
              "startDate":moment().format("YYYY-MM-DD"),
              "endDate":moment().format("YYYY-MM-DD")
            })
          }

          this.timer = setInterval( getData, 10000)
          
       }
       else{
         /* eslint-disable-next-line */
         console.log("condición no cumplida",this.$store.state.businessEvents.startDate === this.$store.state.businessEvents.endDate,
         this.$store.state.businessEvents.startDate === moment().format("YYYY-MM-DD"), this.$store.state.businessEvents , moment().format("YYYY-MM-DD") );

       }

      
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
        itemsFiltered: null,
        startDate:null,
        endDate:null,
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
        transeqno: null,
        timer: ''
      }
    },
    methods:{
     
      filterFromDates(){

          this.itemsFiltered = null;
         
          this.$store.dispatch("businessEvents/getEventsByDates",{
            "startDate": this.startDate,
            "endDate": this.endDate
          })

          clearInterval(this.timer)
        
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
      },
      parseStates(state){

        switch(state){

          case "QUERY":
            return "Consultado";
          case "ORDER":
            return "Aprobado";
          case "CANCEL":
            return "Cancelado";
          case "REJECT":
            return "Rechazado";

        }

      }

    },
    beforeMount(){
      //this.getItems()
    },
    beforeDestroy () {
      clearInterval(this.timer)
    },
    mounted() {
      if (this.$route.params.type) {
        
        switch(this.$route.params.type){

          case "all":

            this.itemsFiltered = this.items.filter( data => data.state === "ORDER" )

            break;

          case "rejects":

            this.itemsFiltered = this.items.filter( data => data.state === "REJECT" )

            break;

          case "cancels":

            this.itemsFiltered = this.items.filter( data => data.state === "CANCEL" )

            break;

        }
        

      } 
    }
   
    
  }
</script>