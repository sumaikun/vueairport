<template>
    <v-dialog v-model="countryDialog" persistent max-width="600px">       
        <v-card>
          <v-card-title>
            <span class="headline">Datos</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field label="Nombre del país *" v-model="country.name" required></v-text-field>
                </v-col>                
              </v-row>
            </v-container>
            <small>* Indica campo obligatorio</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click.native="$emit('closeCountryDialog')">Cerrar</v-btn>
            <v-btn color="blue darken-1" text @click.native="$emit('save')">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>
<script>

    export default {
        name: 'CountryDialog',
        props:{
          countryDialog:Boolean,
          country:Object
        },
        created(){
          //this.countryDialog = false;
          /* eslint-disable-next-line */
          console.log(this.countryDialog);

        }
    }

</script>