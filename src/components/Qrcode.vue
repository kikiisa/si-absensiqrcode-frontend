<script>
import { QrcodeStream } from "vue-qrcode-reader";
import { provide, ref, } from "vue";

import { useRouter } from 'vue-router'
import { api } from "../utils/URL";
import axios from "axios";
import { toastError, toastSuccess,enskripsi } from '../utils/Setting';
export default {
  components: {
    QrcodeStream,
  },
  setup() {
    const route = useRouter()
    const result = ref("");
    const error = ref("");
    const logout = () => 
    {
        window.localStorage.removeItem("UUID")
        toastSuccess("Berhasil Logout")
        window.location.reload()
        
      }
    const getInformasi = async () => 
    {
      const informasi = await axios.get(`${api}/informasi`)
      return informasi.data
    }
    function paintBoundingBox(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const {
          boundingBox: { x, y, width, height },
        } = detectedCode;

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#007bff";
        ctx.strokeRect(x, y, width, height);
      }
    }

    function onError(err) {
      error.value = `[${err.name}]: `;

      if (err.name === "NotAllowedError") {
        error.value += "you need to grant camera access permission";
      } else if (err.name === "NotFoundError") {
        error.value += "no camera on this device";
      } else if (err.name === "NotSupportedError") {
        error.value += "secure context required (HTTPS, localhost)";
      } else if (err.name === "NotReadableError") {
        error.value += "is the camera already in use?";
      } else if (err.name === "OverconstrainedError") {
        error.value += "installed cameras are not suitable";
      } else if (err.name === "StreamApiNotSupportedError") {
        error.value += "Stream API is not supported in this browser";
      } else if (err.name === "InsecureContextError") {
        error.value +=
          "Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.";
      } else {
        error.value += err.message;
      }
    }

    async function onDetect(detectedCodes)  {
      result.value = detectedCodes.map((code) => code.rawValue);
      const response = await getInformasi();
      if(result.value[0] == response.qrcode_masuk)
      {
        window.localStorage.setItem("token",enskripsi(response.qrcode_masuk))
        toastSuccess("Scan Berhasil Silahkan Selfie Sebagai Bukti Absensi Masuk Hari ini")

        route.push('/absensi_masuk')
        
      }else if(result.value[0] == response.qrcode_pulang)
      {
        window.localStorage.setItem("token",  enskripsi(response.qrcode_pulang))
        toastSuccess("Scan Berhasil Silahkan Selfie Sebagai Bukti Absensi Keluar Hari ini")
      route.push('/absensi_keluar')
      }else{
        toastError("Qr kode Tidak Terdaftar")
      }
    }
    return { result, error, onDetect, onError, paintBoundingBox,logout };
  },
};
</script>

<template>
  <main class="camera" v-if="result[0] != 'present'">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="bg-info p-4 rounded-4 text-center text-light fw-bold mb-3">
          Silahkan Scan Qr Code untuk memulai absensi
        </div>
      </div>
      <div class="col-lg-8">
        <button @click="logout" class="btn btn-danger mb-2 fw-bold"><i class="fa fa-arrow-left"></i> Keluar</button>
      
      </div>
      <div class="col-lg-8">
        <div class="card border-0">
          <div class="card-body">
            <div>
              <QrcodeStream
                :track="paintBoundingBox"
                @detect="onDetect"
                @error="onError"
              ></QrcodeStream>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
    .camera{
        margin-top: 50px;
    }
</style>
