<template>
  <v-container id="dashboard" fluid grid-list-lg class="mx-0 pa-0">

    

     <v-date-picker
        v-model="pickerDate"
        full-width
        :landscape="$vuetify.breakpoint.smAndUp"
        class="mt-4"
    ></v-date-picker>

    
   

    <v-layout row wrap>       
      <v-flex md3 sm6 xs12 v-for="(stat,index) in stats.monthlyStats" v-bind:key="index">
        <v-card :class="stat.bgColor" dark>
          <v-container fluid grid-list-sm dark>
            <Loading></Loading>
            <v-layout class="mt-0 mb-0 mx-1" row wrap>
              <v-flex sm3 hidden-xs-only>
                <v-icon class="mx-0" x-large dark>{{stat.icon}}</v-icon>
              </v-flex>
              <v-flex sm9 xs12>
                <v-layout class="mt-0 mb-0 pa-0" row wrap>
                  <v-flex d-flex xs12>
                    <div class="silver--text subheading">{{stat.title}}</div>
                  </v-flex>
                  <v-flex d-flex xs12>
                    <div class="silver--text display-1">{{ getCount(stat.title) }}</div>                   
                    <v-btn  class="darkgrey--text darken-1" style="display:contents" @click="goToReport(stat.action.link)"  right small>{{stat.action.label}}</v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>


  <!--
    <v-layout class="" row wrap>
      <v-flex md4 xs12>
        <v-card light>
          <doughnut></doughnut>
        </v-card>
      </v-flex>
      <v-flex md4 xs12>
        <v-card light>
          <bar></bar>
        </v-card>
      </v-flex>
      <v-flex md4 xs12>
        <v-card light >
          <line-chart></line-chart>
        </v-card>
      </v-flex>
    </v-layout>
  -->
    
  </v-container>
</template>
<script>
  //import Bar from "../components/chart/Bar";
  //import Doughnut from "../components/chart/Doughnut";
  //import LineChart from "../components/chart/LineChart";

  import Loading from "@/components/Loading.vue";
  
  import moment from "moment"

  export default {
    name: "Dashboard",
    created(){
      /* eslint-disable-next-line */
      console.log(moment().format("YYYY-MM-DD"));

      if(this.$store.state.businessEvents.startDate !== moment().format("YYYY-MM-DD") ||
        this.$store.state.businessEvents.startDate != this.$store.state.businessEvents.endDate
        || this.$store.state.businessEvents.startDate === null )
      {

        this.pickerDate = moment().format("YYYY-MM-DD")

        /*this.$store.dispatch("businessEvents/getEventsByDates",{
          "startDate":moment().format("YYYY-MM-DD"),
          "endDate":moment().format("YYYY-MM-DD")
        })*/

        //alert("here");

      }
      else{

        /* eslint-disable */
        //console.log(this.$store.state.businessEvents.items)

        this.pickerDate = this.$store.state.businessEvents.startDate ? this.$store.state.businessEvents.startDate :  moment().format("YYYY-MM-DD")

        /*this.$store.dispatch("businessEvents/getEventsByDates",{
          "startDate":this.$store.state.businessEvents.items.startDate,
          "endDate":this.$store.state.businessEvents.items.startDate
        })*/

        /* eslint-disable-next-line */
        console.log(this.$store.state.businessEvents.items.startDate);

        //alert("here2");

      }
      

    },
    computed:{
      items(){       
        return this.$store.state.businessEvents.items
      },
      loading(){
        return this.$store.state.businessEvents.loading
      }     
    },
    data() {
      
      return {
        pickerDate: null,
        timer: [],      
        stats: {
          monthlyStats: [
            {
              bgColor: "cyan darken-3",
              icon: "card_membership",
              title: "Ingresos",
              data: "0",
              action: {
                label: "Mas Info",
                link: "reports/all"
              }
            },
            {
              bgColor: "blue-grey darken-1",
              icon: "card_membership",
              title: "Invitados",
              data: "0",
              action: {
                label: "Mas Info",
                link: "reports/all"
              }
            },
            {
              bgColor: "deep-orange  lighten-3",
              icon: "card_membership",
              title: "Rechazos",
              data: "0",
              action: {
                label: "Mas Info",
                link: "reports/rejects"
              }
            },
           
            {
              bgColor: "pink  lighten-4",
              icon: "card_membership",
              title: "Cancelaciones",
              data: "0",
              action: {
                label: "Mas Info",
                link: "reports/cancels"
              }
            }
          ]
        }
      };
    },
    components: {
      Loading
    },
    mounted() { 
      
    },
    methods:{
      getCount(type){
          switch(type)
          {
            case "Ingresos":

              return this.items.filter( data => data.state === "ORDER"  ).length

            case "Invitados":

              var guestNumber = 0;

              this.items.forEach(element => {
                if(element.state === "ORDER" )
                {
                   guestNumber = Number(guestNumber) + Number(element.adultC) + Number(element.childC)
                }
              });

              return guestNumber;

            case "Rechazos":

              return this.items.filter( data => data.state === "REJECT"  ).length

            case "Cancelaciones":

              return this.items.filter( data => data.state === "CANCEL"  ).length
            
          }
      },
      goToReport(link){
        /* eslint-disable-next-line */
        console.log(link);
        this.$router.push(link);
      }
    },
     watch: {
      pickerDate (val) {
        
        /* eslint-disable-next-line */
        console.log(val);

        if(val === moment().format("YYYY-MM-DD"))
        {
          /* eslint-disable-next-line */
          console.log("enable auto reload");

          const getData = ()=>{ this.$store.dispatch("businessEvents/getEventsByDates",{
              "startDate":moment().format("YYYY-MM-DD"),
              "endDate":moment().format("YYYY-MM-DD")
            })
          }

          getData();
          
          this.timer.push(setInterval( getData, 10000));

        }

        else{

          this.timer.forEach( time => clearInterval(time) )
          

          this.$store.dispatch("businessEvents/getEventsByDates",{
            "startDate":val,
            "endDate":val
          })

          

        }

       

      }
     },
     beforeDestroy () {
      this.timer.forEach( time => clearInterval(time) )
    }  
   
  };
</script>
<style scoped>
  #dashboard .flex {
    margin-bottom: 2px;
  }
</style>
