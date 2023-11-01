
<script>
import Camera from "simple-vue-camera";
import {useRouter} from 'vue-router'
import { ref } from "vue";

export default {
  components: {
    Camera,
  },
  setup() {
    const route = useRouter()
    const camera = ref(Camera);
    
    // Use camera reference to call functions
    const snapshot = async () => {
      const blob = await camera.value?.snapshot();
      // To show the screenshot with an image tag, create a url
      const url = URL.createObjectURL(blob);
      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        var base64data = reader.result;
        console.log(base64data);
      };
      console.log(url);
    };
    const back = () => 
    {
        window.localStorage.clear()
        route.push('/')

    }
    return {
      camera,
      snapshot,
      back
    };

  },
};
</script>

<template>
  <main class="camera">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="bg-info p-4 rounded-4 text-center text-light fw-bold mb-3">
          Silahkan Kirim Swa Foto Untuk Melakukan Absensi 
        </div>
      </div>
      <div class="col-lg-8">
        <div class="card border-0">
          <div class="card-body">
            <camera
              :resolution="{ width: 375, height: 212 }"
              ref="camera"
              autoplay
            ></camera>
            <button class="btn btn-primary fw-bold btn-sm" @click="snapshot">
              Absensi Sekarang
            </button>
            <button class="btn btn-dark fw-bold btn-sm ms-2" @click="back">Kembali</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
.camera {
  margin-top: 50px;
}
</style>
