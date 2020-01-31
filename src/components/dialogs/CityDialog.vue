<template>
    <v-dialog v-model="cityDialog" persistent max-width="600px">       
        <v-card>
          <v-card-title>
            <span class="headline">Datos</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field label="Nombre de la ciudad *" v-model="city.name" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-autocomplete
                    item-text="name"
                    item-value="id"
                    :items="countries"
                    label="País"
                    v-model="city.country"               
                  ></v-autocomplete>
                </v-col>                
              </v-row>
            </v-container>
            <small>* Indica campo obligatorio</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click.native="$emit('close')">Cerrar</v-btn>
            <v-btn color="blue darken-1" text @click.native="$emit('save')">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>
<script>

    export default {
        name: 'CityDialog',
        props:{
          cityDialog:Boolean,
          city:Object,
          countries: Array,
        },
        created(){
          //this.countryDialog = false;
          /* eslint-disable-next-line */
          console.log(this.cityDialog);
        }
    }

</script>