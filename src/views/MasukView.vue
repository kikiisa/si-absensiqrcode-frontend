<script>
import { onMounted } from 'vue';
import Camera from '../components/Camera.vue';
import {deskripsi,toastError} from "../utils/Setting"
import {useRouter} from 'vue-router'
import {api} from "../utils/URL"
import axios from "axios"
export default {
  components:{
    Camera
  },
  setup() {
    const route = useRouter()
    const getInformasi = async () => {
      const informasi = await axios.get(`${api}/informasi`)
      return informasi.data
    }
    onMounted(async () => {
        const informasi = await getInformasi()
        console.log(informasi.qrcode_masuk) 
        const result = deskripsi(window.localStorage.getItem("token") == null ? '' : window.localStorage.getItem("token"))
        if(result != informasi.qrcode_masuk)
        {
          
          route.push('/')
          toastError("Terjadi Kesalahan")
        }
    })
  },
}
</script>
<template>
  <main class="container mb-4">
    <Camera/>
  </main>

</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
