<template>
  <v-container fluid>
    <v-flex xs12>
        <v-card>
            <v-card-title>
                <span class="title"> Salas {{pagination? "("+pagination.totalItems+")": ""}}
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
            <Table  :headers="headers" :items="items"  :pagination="pagination" @edit="edit" @remove="remove"></Table>
        
        </v-card>
    </v-flex>
    
   
    <!--
    <confirm-dialog :dialog="dialog" :dialogTitle="dialogTitle" :dialogText="dialogText" @onConfirm="onConfirm" @onCancel="onCancel" ></confirm-dialog>
        <v-snackbar v-if="loading===false" :right="true" :timeout="timeout" :color="mode" v-model="snackbar" >
            {{ notice }}
            <v-btn dark flat @click.native="closeSnackbar">Close</v-btn>
        </v-snackbar>
    -->

  </v-container>
</template>
<script>

import Table from "@/components/Table.vue";
import Loading from "@/components/Loading.vue";
import { mapState } from "vuex";
  import { crudPageMethods } from "@/utils/crud-methods"

    export default {
        name: 'RoomsList',
        components:{
            Table,
            Loading
        },
        created(){

            this.headers = [
                {
                    text: 'Nombre sala',
                    left: true,
                    value: 'name'
                },
                { text: 'Ubicación', value: 'city',
                    type: 'relationship',
                    dataSet: this.cities, },
                { text: 'Id dragon pass', value: 'dragonpassId' },
                { text: 'Descripción', value: 'description' },
                { text: 'preview', value: 'picture', type: 'image' },
                { text: 'Opciones', value: 'crudButtons', sortable: false }          
            ];
         
            this.pagination.totalItems = 0;
            this.$store.dispatch("rooms/getAll")
            this.$store.dispatch("cities/getAll")
            this.crudPage = new crudPageMethods( this,"","rooms/getAll","rooms/delete");

        },
        data: () => ({
            headers: [],
            crudPage: {},                   
        }),
        computed: {
            ...mapState("rooms", {
                items: "items",              
                pagination: "pagination"                             
            },"app",{
                loading: "loading",
            }),
            cities(){
                return this.$store.state.cities.items;
            }
        },
        methods: {

            reloadData(){
                /* eslint-disable-next-line */
                //console.log(this.$store);
                if(!this.loading)
                {
                    this.$store.dispatch("rooms/getAll")
                }
            },
            add(){                
                this.$router.push('RoomForm');
            },
            edit(item){
                /* eslint-disable-next-line*/
                console.log(item);                
                this.$router.push({ name: 'RoomForm', params: { id: item.id } })
            },
            remove(item){                   
                this.crudPage.remove(item)
            }

        }
    };
</script>
<style>
    .iconButtons{
        margin:10px;
    }
</style>