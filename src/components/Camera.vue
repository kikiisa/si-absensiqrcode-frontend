
<script>
import Camera from "simple-vue-camera";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { api } from "../utils/URL";
import { deskripsi,toastError,toastSuccess,dataURLToBlob } from "../utils/Setting";
import axios from "axios";
export default {
  components: {
    Camera,
  },
  setup() {
    const route = useRouter();
    const camera = ref(Camera);
    const token = window.localStorage.getItem("token");
    const uuid = window.localStorage.getItem("UUID");
        // Use camera reference to call functions
      const switchToFrontCamera = () => {
        if (camera.value) {
        // Assuming there's a method or property to switch to the front camera
        camera.value.facingMode = "user"; // Adjust this based on the actual method/property
      }
    };
    const snapshot = async () => {
      if ("geolocation" in navigator) {
      // Menggunakan navigator.geolocation.getCurrentPosition untuk mendapatkan lokasi
      navigator.geolocation.getCurrentPosition(
        async function (position) {
          // Mendapatkan koordinat longitude dan latitude
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          const blob = await camera.value?.snapshot();
          
        // To show the screenshot with an image tag, create a url
          const url = URL.createObjectURL(blob);
          var reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = async () => {
            var base64data = reader.result;
            // console.log(deskripsi(uuid));
            // console.log(base64data);
            const data = new FormData();
            data.append("token", deskripsi(token));
            data.append("uuid",deskripsi(uuid))
            data.append("image", dataURLToBlob(base64data));
            data.append("longitude",longitude);
            data.append("latitude",latitude)
            const response = await axios.post(`${api}/absensi`, data)
            .then((response) => {
              const { status,message } = response.data
              if(status == false)
              { 
                route.push('/')
                window.localStorage.removeItem("token")
                toastError(message)
              }else{
                route.push('/')
                window.localStorage.removeItem("token")
                toastSuccess(message)
              }
            }).catch((error) => {
              toastError(error)
              console.log(error)
            })
          };
        },
        function (error) {
          toastError(`Error: ${error.message}`);
        }
      );
    } else {
      // Tampilkan pesan jika geolocation tidak didukung
      console.log("Geolocation is not supported by this browser.");
    }
    };
    const back = () => {
      window.localStorage.removeItem("token");
      route.push("/");
    };
    return {
      camera,
      snapshot,
      back,
      switchToFrontCamera
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
            <button @click="switchToFrontCamera" class="fa fa-camera-retro" >Switch Kamera</button>
            <button class="btn btn-primary fw-bold btn-sm" @click="snapshot">
              Absensi Sekarang
            </button>
            <button class="btn btn-dark fw-bold btn-sm ms-2" @click="back">
              Kembali
            </button>
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
