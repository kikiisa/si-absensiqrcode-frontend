<script>
import { onMounted, ref } from "vue";
import Qrcode from "../components/Qrcode.vue";
import Login from "../components/Login.vue";
export default {
  components: {
    Qrcode,Login
  },
  setup() {
    const statusLog = ref(false)
    const check = () => {
      if (window.localStorage.getItem("UUID") == null) {
        return statusLog.value = false
      }else{
        return statusLog.value = true
      }
    }
    onMounted(() => {
      check()
    })
    return { statusLog, check }
  },
};
</script>
<template>
  <main class="container mb-4">
    <Login v-if="statusLog == false"/>
    <Qrcode v-else />
  </main>
</template>
