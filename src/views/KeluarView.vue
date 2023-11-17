<script>
import { onMounted } from 'vue';
import Camera from '../components/Camera.vue';
import {deskripsi,toastError} from "../utils/Setting"
import {useRouter} from 'vue-router'
import axios from "axios"
import {api} from "../utils/URL"
export default {
  components:{
    Camera
  },
  setup() {
    const route = useRouter()
    const informasi = async () => {
      const datas = await axios.get(`${api}/informasi`)
      return datas.data
    }
    onMounted(async () => {
        const datas = await informasi()
        console.log(datas.qrcode_pulang)
        const result = deskripsi(window.localStorage.getItem("token") == null ? '' : window.localStorage.getItem("token"))
        if(result != datas.qrcode_pulang)
        {
          route.push('/')
          toastError("Token Tidak Valid")
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
