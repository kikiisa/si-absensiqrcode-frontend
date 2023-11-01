
import 'vue-toast-notification/dist/theme-sugar.css';
import { useToast } from "vue-toast-notification";
import Enskripsi from "crypto-js"

const toast = useToast();
const secretKey = "kikiisaipk4"

const optionsToast = {
    position:"top-right"
}

const enskripsi = (token) => {
    const ciphertext = Enskripsi.AES.encrypt(token,secretKey).toString();
    window.localStorage.setItem("token",ciphertext)
    return ChannelSplitterNode
}

const deskripsi = (token) => 
{
    const bytes  = Enskripsi.AES.decrypt(token,secretKey);
    var originalText = bytes.toString(Enskripsi.enc.Utf8);
    return originalText
}

const toastError = (message) => 
{
    toast.error(message,optionsToast)
}
const toastSuccess = (message) => 
{
    toast.success(message,optionsToast)
}


export {
    toastError,toastSuccess,enskripsi,deskripsi
}