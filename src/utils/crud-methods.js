/* eslint-disable */
import api from "@/services/backend-api";

import {
    // eslint-disable-next-line
    //getDefaultPagination,
    commitPagination,
  } from "./store-utils";


export class crudPageMethods { 
    
  constructor(vuePage,formPage,getAllStore,deleteStore){

      this.vuePage = vuePage;

      this.formPage = formPage;

      this.getAllStore = getAllStore;

      this.deleteStore = deleteStore;

    }

    reloadData = ()=>{
      /* eslint-disable-next-line */
      //console.log(this.$store);
      if(!this.vuePage.loading)
      {
          this.vuePage.$store.dispatch(this.getAllStore)
      }
    }

    add = ()=>{
      this.vuePage.$router.push(this.formPage);
    }

    edit = (item) =>{
      /* eslint-disable-next-line*/
      console.log(item);
      this.vuePage.$router.push({ name: this.formPage, params: { id: item.id } })
    }

    remove = (item) =>{
      /* eslint-disable-next-line*/
        //console.log(item,this);
    
        let self = this;
    
        this.vuePage.$swal({
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
                self.vuePage.$store.dispatch(this.deleteStore,item.id).then( data => {
                    /* eslint-disable-next-line */
                    console.log("delete response",data)
                    if(data)
                    {                            
                            self.vuePage.$swal(
                            '',
                            'La información ha sido eliminada.',
                            'success'
                            )
    
                            this.reloadData()
                            //this.$store.dispatch("users/getAllUsers")                                
                    }
                    else{
                        self.vuePage.$swal(
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



export class crudApiHelper{
   
  constructor(storeIndex,setObjectIndex,objectType){
    
    this.storeIndex = storeIndex;   

    this.setObjectIndex = setObjectIndex;

    this.objectType = objectType;

  }

  getById = function(commit,id){

     

      if (id) {
        api.getData(this.storeIndex+"/"+id).then(
          res => {
            /* disable-next-line */
            //console.log("data",res.data,this.setObjectIndex);
            const object = res.data;
            commit(this.setObjectIndex, object  );            
          },
          err => {
            /* disable-next-line */  
            //console.log(err);
          }
        );
      } else {
     
        commit(this.setObjectIndex,  new this.objectType() );
        
      }

  }

  getAll(commit){     
      
      api.getData(this.storeIndex).then(res => {

        /* eslint-disable-next-line */
        //console.log("data",res.data);
        //const customers = res.data;     

        commitPagination(commit, res.data);
               
      });

  }

  delete(id){

    return api
      .deleteData(this.storeIndex + "/" + id)
      .then(res => {
        /* eslint-disable-next-line */
        //console.log("delete done");
        return true;
      })
      .catch(err => {
        /* eslint-disable-next-line */
        console.log(err);
        return false;
    });

  }

  save(commit,object,reload = false){

    let self = this;

    if (!object.id) {
      
        delete object.id;
        
        return api
          .postData(this.storeIndex, object)
          .then(res => {
           
            commit(this.setObjectIndex, res.data);
            
            if(reload)
            {
              self.getAll(commit);
            }
            

            return true;        
          })
          .catch(err => {
            //console.log(err);
            return false;         
          });
  
  
      } else {
        
        return api
          .putData(this.storeIndex + "/" + object.id, object)
          .then(res => {      
            
            if(reload)
            {
              self.getAll(commit);
            }

            return true;         
          })
          .catch(err => {
            console.log(err);
            return false;     
          });
      }

  }

}  




  