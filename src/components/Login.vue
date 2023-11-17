<script>
import { ref } from 'vue'
import axios from 'axios'
import { api } from '../utils/URL'
import {toastError, toastSuccess,enskripsi } from '../utils/Setting'
export default {
  setup() {
    const inputForm = ref("")
    const uuid = ref("")
    const checkAccount = async () => 
    {
      const response = await axios.post(`${api}/auth`,{
        nip:inputForm.value
      }).then((response) => {
        const datas = response.data;
        console.log(enskripsi(datas.data.uuid));
        if(datas.status == false)
        {
          toastError(datas.message)
        }else{
          window.localStorage.setItem("UUID",enskripsi(datas.data.uuid))
          window.location.reload();
          toastSuccess('Berhasil');
        }
      }).catch((error => {
        const messageErrror = error
        toastError(error)
      })) 
      
    }
    return  { checkAccount,inputForm }
  },
}
</script>
<template>
  <div class="row justify-content-center login">
    <div class="col-lg-4 col-md-6">
      <div class="text-center">
        <img  src="../assets/bg.png" alt="security" width="350">
      </div>
      <div class="card border-0">
        <div class="card-body">
          <h5 class="mb-2 mt-2">Login To Account</h5>
          <form  @submit.prevent="checkAccount" method="post">
            <div class="form-group">
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1"><i class="fa fa-
                    fa-id-card"></i></span>
                <input
                  v-model="inputForm"
                  type="text"
                  class="form-control"
                  placeholder="NIP PEGAWAI"
                  aria-label="Nomor"
                  aria-describedby="basic-addon1"
                />
              </div>
              <button class="w-100 btn btn-primary fw-bold">Masuk</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.login{
  margin-top: 50px;
}
.form-control{
  border-width: 1px;

}
.form-control:focus{
    box-shadow: none;
    border-color: #436BBA;

}
</style>