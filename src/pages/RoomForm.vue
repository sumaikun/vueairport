<template>
  <v-container fluid>

 

    <v-flex xs12>
      <v-card class="elevation-0">
        <v-card-title class="title">
          <span style="margin-left:15pt" >{{title}}</span>
          <v-spacer></v-spacer>
          <v-btn fab small class="grey iconButtons" @click.native="cancel()">
            <v-icon>cancel</v-icon>
          </v-btn>
          &nbsp;
          <v-btn fab small class="red iconButtons" @click.native="save()">
            <v-icon>save</v-icon>
          </v-btn>
        </v-card-title>

         <Loading></Loading>

        <v-card-text>
          <v-container fluid grid-list-sm>
            <v-layout row wrap>            
              <v-flex md12 sm12>
                <v-container fluid grid-list-sm>
                  <v-layout row wrap>

                    <v-flex md10 sm12 xs12  class="mx-1 px-0">
                      <v-text-field name="name" label="Nombre de la sala" autocomplete="off"                         
                       hint="Nombre de la sala es un dato obligatório" value="" v-model="room.name"
                       class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md5 sm12 xs12  class="mx-1 px-0">
                      <v-autocomplete
                        label="País"
                        item-text="name"
                        item-value="id"
                        :items="countries"
                         v-model="selectedCountry"          
                      ></v-autocomplete>                    
                    </v-flex>

                    <v-flex md5 sm12 xs12  class="mx-1 px-0">
                      <v-autocomplete
                        label="Ciudad"
                        item-text="name"
                        item-value="id"
                        :items="filteredCities"
                        v-model="room.city"         
                      ></v-autocomplete>                    
                    </v-flex>

                    <v-flex md4 sm12 xs12  class="mx-1 px-0">
                      <v-text-field 
                       name="name"
                       label="Identificador de dragon pass"
                       autocomplete="off"                         
                       hint="El identificador es un dato obligatório"
                       v-model="room.dragonpassId" 
                       value="" 
                       class="input-group--focused" required></v-text-field>
                    </v-flex>

                    <v-flex md6 sm12 xs12  class="mx-1 px-0">
                     <v-text-field  
                       label="Descripción" autocomplete="off"                         
                       hint="La descripción no es un dato obligatório"
                       value="" v-model="room.description"
                       class="input-group--focused" required></v-text-field>
                    </v-flex>                   

                    <v-flex md10 sm12 xs12  class="mx-1 px-0" v-if="!room.picture" >
                      <vue-dropzone ref="myVueDropzone"
                       id="dropzone"
                      :options="dropzoneOptions"
                      @vdropzone-file-added="vfileAdded"
                      @vdropzone-success="vsuccess" 
                      ></vue-dropzone>
                    </v-flex>

                    <v-flex md6 sm12 xs12  class="mx-1 px-0" v-if="room.picture">
                        <vue-dropzone ref="myVueDropzone"
                          id="dropzone"
                          :options="dropzoneOptions"
                          @vdropzone-file-added="vfileAdded"
                          @vdropzone-success="vsuccess" 
                          ></vue-dropzone>
                          
                    </v-flex>

                    <v-flex md4 sm12 xs12  class="mx-1 px-0" v-if="room.picture">
                        <v-img :src="room.picture" aspect-ratio="1.7"></v-img>
                    </v-flex>

                  </v-layout>
                </v-container>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

      </v-card>
    </v-flex>

  </v-container>
</template>
<script>


  import Loading from "@/components/Loading.vue";

  import vue2Dropzone from 'vue2-dropzone'

  import { mapState } from 'vuex'


  export default {
    components:{
      Loading,
      vueDropzone: vue2Dropzone
    },
    data() {

      const FileUrl = process.env.VUE_APP_SERVER_HOST + "uploadFile"
      //const FileUrl = "https://httpbin.org/post";

      /* global Store */

      const {token} = Store.state.user

      /* eslint-disable-next-line */
      console.log("FileUrl",FileUrl);

      return {

        title: '',
        selectedCountry: '',
        filteredCities: [],
        statusValidation: [],      
        rules: {       
        },        
        dropzoneOptions: {
            url: FileUrl,
            headers: { "Authorization": "Bearer "+token },
            thumbnailWidth: 150,
            maxFilesize: 0.5,
            maxFiles: 1,
            addRemoveLinks: true,
            autoProcessQueue: false           
        }

      }
    },
    computed: {
      ...mapState('rooms', {     
        room: 'room',
        loading: 'loading',    
      }),

      countries(){
        return this.$store.state.countries.items;
      },

      cities(){
        return this.$store.state.cities.items;
      }    

    },
    methods: {

      save() {  
       

        if( this.room.name === "" ||  this.room.city === "" ||  this.room.dragonpassId === "")
        {
          return this.$swal(
                  '',
                  'Debe llenar los datos obligatorios para continuar',
                  'error'
                )
        }
        else{

            if(this.$refs.myVueDropzone.getAcceptedFiles().length > 0)
            {
                /* eslint-disable-next-line */
                //console.log(this.$refs.myVueDropzone.processQueue());
                this.$refs.myVueDropzone.processQueue()
            }
            else{

                this.$store.dispatch("rooms/save",this.room).then( (data) =>{
                    /* eslint-disable-next-line */
                    if(data)
                    {
                      this.$swal({icon:'success',title: '!Datos registrados!'})
                    }else{
                      this.$swal({icon:'error',title: '!Hay error en la conexión con el servidor!'})
                    }
                    
                });
                
            }

        }

      },
      cancel() {
        this.$router.push({ name: 'Rooms' })
      },
      vfileAdded(file) {
      

        if(this.$refs.myVueDropzone.getAcceptedFiles().length > 0)
        {
          this.$swal(
              '',
              'No se puede subir mas de una imagen',
              'error'
          )

          this.$refs.myVueDropzone.removeFile(file);

        }
        else{
            /* eslint-disable-next-line */
            console.log(file.type,file.type.indexOf("image"));
            if( file.type.indexOf("image") === -1 )
            {
                this.$swal(
                  '',
                  'Solo pueden subirse imágenes',
                  'error'
                )

                this.$refs.myVueDropzone.removeFile(file);
            }
        }

      },
      vsuccess(file, response) {
        /* eslint-disable-next-line */
        console.log(file,response)
        if(response.fileDownloadUri)
        {
          this.room.picture = response.fileDownloadUri
          this.$store.dispatch("rooms/save",this.room)
        }
      }
    },
    created() {

      this.statusValidation = [];      
      
      //if (this.$route.params.id) {
        this.$store.dispatch("rooms/getById",this.$route.params.id);
      //}

      this.$store.dispatch("countries/getAll")
            
      this.$store.dispatch("cities/getAll")  

    },
    mounted() {
      if (this.$route.params.id) {
        this.title = 'Editar Sala'
      } else this.title = 'Nueva sala'     

    },
    watch: {
      selectedCountry(val){

        /* eslint-disable-next-line */
        console.log(val);
        const generateData = this.cities.filter( city => city.country === val );
        this.filteredCities = generateData;
      },
      room(val){

          if(val.city && this.selectedCountry === ''){

            const filterCity = this.cities.findIndex( data => data.id === this.room.city )
            /* eslint-disable-next-line */
            //console.log("city index",filterCity);
            if(filterCity !== -1)
            {
              const cityFound = this.cities[filterCity];
              /* eslint-disable-next-line */
              console.log("city found",cityFound);
              const filterCountry = this.countries.findIndex( data => data.id === cityFound.country )
              this.selectedCountry = this.countries[filterCountry].id;
            } 

          }
      }
    }
  }
</script>
<style>
    .iconButtons{
        margin:10px;
    }
</style>
