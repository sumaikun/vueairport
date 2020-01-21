<template>
  <v-container fluid>
    <v-flex xs12>
        <v-card>
            <v-card-title>
                <span class="title"> Usuarios {{pagination? "("+pagination.totalItems+")": ""}}
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

    export default {
        name: 'UsersList',
        components:{
            Table,
            Loading
        },
        created(){

            this.headers = [
                {
                    text: 'Usuario del sistema',
                    left: true,
                    value: 'username'
                },
                { text: 'Nombre', value: 'name' },
                { text: 'Apellido', value: 'secondname' },
                { text: 'Correo electrónico', value: 'email' },
                { text: 'Opciones', value: 'crudButtons', sortable: false }          
            ];
         
            this.pagination.totalItems = 0;
            this.$store.dispatch("users/getAllUsers")

        },
        data: () => ({
            headers: [],                   
        }),
        computed: {
            ...mapState("users", {
                items: "items",              
                pagination: "pagination",
                loading: "loading",
                mode: "mode",
                snackbar: "snackbar",
                notice: "notice"
            })
        },
        methods: {

            reloadData(){
                /* eslint-disable-next-line */
                //console.log(this.$store);
                if(!this.loading)
                {
                    this.$store.dispatch("users/getAllUsers")
                }
            },
            add(){
                this.$router.push('UserForm');
            },
            edit(item){
                /* eslint-disable-next-line*/
                console.log(item);
                this.$router.push({ name: 'UserForm', params: { id: item.id } })
            },
            remove(item){
                /* eslint-disable-next-line*/
                console.log(item);
                this.$swal({
                title: '¿Estas seguro?',
                text: "¡No posdrás revertir este proceso!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, adelante!',
                cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.value) {
                    this.$store.dispatch("users/deleteCustomer",item.id).then( data => {
                            if(data)
                            {                            
                                    this.$swal(
                                    '',
                                    'La información ha sido eliminada.',
                                    'success'
                                    )
                                    this.$store.dispatch("users/getAllUsers")                                
                            }
                            else{
                                this.$swal(
                                    '',
                                    'Ocurrio un error en la conexión al servidor',
                                    'error'
                                )
                            }
                        });
                    }                   
                })
            }

        }
    };
</script>
<style>
    .iconButtons{
        margin:10px;
    }
</style>