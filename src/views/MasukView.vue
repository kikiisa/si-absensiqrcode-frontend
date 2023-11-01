<script>
import { onMounted } from 'vue';
import Camera from '../components/Camera.vue';
import {deskripsi,toastError} from "../utils/Setting"
import {useRouter} from 'vue-router'
export default {
  components:{
    Camera
  },
  setup() {
    const route = useRouter()
    onMounted(() => {
      
        const result = deskripsi(window.localStorage.getItem("token"))
        if(result != "present_masuk")
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
