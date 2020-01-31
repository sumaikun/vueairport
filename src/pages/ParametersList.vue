<template>  
  <v-container fluid>
    <CountryDialog :countryDialog="countryDialog" :country="country"
     @closeCountryDialog="closeCountryDialog" @save="saveCountry" />
    <CityDialog :cityDialog="cityDialog" :city="city" :countries="items"
     @close="closeCityDialog" @save="saveCity" />
    <v-row>  
        <v-flex lg6 md6 xs12 class="table-container">
            <v-card > 
                <v-card-title>
                    <span class="title"> Paises {{pagination? "("+pagination.totalItems+")": ""}}
                        <v-text-field append-icon="search" label="Buscar" single-line hide-details ></v-text-field>
                    </span>
                    <v-spacer></v-spacer>

                        <!--
                        <v-btn class="blue-grey iconButtons" fab small dark @click.native.stop="rightDrawer = !rightDrawer">
                            <v-icon>search</v-icon>
                        </v-btn>
                        -->

                        <v-btn class="brown lighten-1 iconButtons" fab small dark @click.native="reloadData()">
                            <v-icon>refresh</v-icon>
                        </v-btn>
                        <!--
                        <v-btn class="teal darken-2 iconButtons" fab small dark @click.native="print()">
                            <v-icon>print</v-icon>
                        </v-btn>
                        -->

                        <v-btn class="deep-orange darken-3 iconButtons" fab small dark @click.native="add">
                            <v-icon>add</v-icon>
                        </v-btn>
                    
                </v-card-title>

                <Loading></Loading>
                <Table  :headers="headers" :items="items"  :pagination="pagination" @edit="editCountry" @remove="this.crudPage.remove"></Table>
            
            </v-card>
        </v-flex>

        

        <v-flex lg6 md6 xs12 class="table-container">
            <v-card>
                <v-card-title>
                    <span class="title"> Ciudades {{pagination2 ? "("+pagination2.totalItems+")": ""}}
                        <v-text-field append-icon="search" label="Buscar" single-line hide-details ></v-text-field>
                    </span>
                    <v-spacer></v-spacer>

                        <!--
                        <v-btn class="blue-grey iconButtons" fab small dark @click.native.stop="rightDrawer = !rightDrawer">
                            <v-icon>search</v-icon>
                        </v-btn>
                        -->

                        <v-btn class="brown lighten-1 iconButtons" fab small dark @click.native="reloadData2()">
                            <v-icon>refresh</v-icon>
                        </v-btn>
                        <!--
                        <v-btn class="teal darken-2 iconButtons" fab small dark @click.native="print()">
                            <v-icon>print</v-icon>
                        </v-btn>
                        -->

                        <v-btn class="deep-orange darken-3 iconButtons" fab small dark @click.native="add2">
                            <v-icon>add</v-icon>
                        </v-btn>
                    
                </v-card-title>

                <Loading></Loading>
                <Table  :headers="headers2" :items="items2"  :pagination="pagination2" @edit="editCity" @remove="this.crudPage2.remove"></Table>
            
            </v-card>

        </v-flex>
    </v-row>   

  </v-container>
</template>
<script>

import Table from "@/components/Table.vue"
import Loading from "@/components/Loading.vue"
import { crudPageMethods } from "@/utils/crud-methods"
import CountryDialog  from "@/components/dialogs/CountryDialog"
import CityDialog  from "@/components/dialogs/CityDialog"


import { mapState } from "vuex"

    export default {
        name: 'RoomsList',
        components:{
            Table,
            Loading,
            CountryDialog,
            CityDialog
        },
        created(){                   

            this.headers = [
                {
                    text: 'Nombre País',
                    left: true,
                    value: 'name'
                },
                { text: 'Opciones', value: 'crudButtons', sortable: false }  
                       
            ];

            this.headers2 = [
                {
                    text: 'Nombre Ciudad',
                    left: true,
                    value: 'name'
                },
                {
                    text: 'País',
                    left: true,
                    value: 'country',
                    type: 'relationship',
                    dataSet: this.items,
                },
                { text: 'Opciones', value: 'crudButtons', sortable: false }  
                       
            ];
         
            this.pagination.totalItems = 0;

            this.crudPage = new crudPageMethods( this,"","countries/getAll","countries/delete");

            this.crudPage2 = new crudPageMethods( this,"","cities/getAll","cities/delete");

             /* eslint-disable-next-line */
            console.log(this.crudPage);

            this.$store.dispatch("countries/getAll")
            
            this.$store.dispatch("cities/getAll")  

        },
        data: () => ({
            headers: [],
            headers2: [], 
            crudPage: {},
            crudPage2:{},
            countryDialog: false,
            cityDialog: false,                      
        }),
        computed: {

            ...mapState("countries", {
                items: "items",              
                pagination: "pagination",
                country: "country"                   
            },"app",{
                loading: "loading",
            }),

            items2(){
                return this.$store.state.cities.items;
            },
            
            pagination2(){
                return this.$store.state.cities.pagination;
            },

            city(){
                return this.$store.state.cities.city;
            }

        },
        methods: {
            
            editCountry(data){
                /* eslint-disable-next-line */
                console.log(data);
                this.$store.dispatch("countries/getById",data.id)
                this.countryDialog = true;
            },
            add(){
                this.$store.dispatch("countries/getById")
                this.countryDialog = true;                
            },
            add2(){
                this.$store.dispatch("cities/getById")
                this.cityDialog = true;                
            },
            reloadData(){
                this.$store.dispatch("countries/getAll")
            },
            reloadData2(){
                this.$store.dispatch("cities/getAll")
            },
            closeCountryDialog(){
                this.countryDialog = false;
            },
            closeCityDialog(){
                this.cityDialog = false;
            },
            saveCountry(){

                if(this.country.name === "")
                {
                    this.$swal(
                            '',
                            'Necesitas llenar toda la información obligatoria.',
                            'error');
                }
                else{
                    this.$store.dispatch("countries/save",this.country);
                }
                
            },
            editCity(data){

                /* eslint-disable-next-line */
                console.log(data);
                this.$store.dispatch("cities/getById",data.id)
                this.cityDialog = true;

            },
            saveCity(){

                if( this.city.name === "" || this.city.country === "" )
                {
                    this.$swal(
                            '',
                            'Necesitas llenar toda la información obligatoria.',
                            'error');
                }
                else{
                    this.$store.dispatch("cities/save",this.city);
                }
                
            },

        }
    };
</script>
<style>
    .iconButtons{
        margin:10px;
    }
    .table-container{
        padding:20px;
    }
</style>