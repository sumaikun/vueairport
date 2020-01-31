<template>
  <v-container >
    <div class="text-center" style="height:0"  v-if="isFetching">
        <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
        ></v-progress-circular>

        <v-progress-circular
        :width="3"
        color="red"
        indeterminate
        ></v-progress-circular>

        <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        indeterminate
        ></v-progress-circular>

        <v-progress-circular
        :width="3"
        color="green"
        indeterminate
        ></v-progress-circular>

        <v-progress-circular
        :size="50"
        color="amber"
        indeterminate
        ></v-progress-circular>
    </div>  
  </v-container>
</template>
<script>
    export default{        
        computed: {
            isFetching(){
                /* eslint-disable-next-line */
                //console.log("computed in fetching",this.$store.state.app)
                return ( this.$store.state.app.loading ) 
            }
        }
    }
</script>