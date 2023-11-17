
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
    return ciphertext
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

const dataURLToBlob = (dataUrl) => {
    var parts = dataUrl.split(';base64,');
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;
    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {
        type: contentType
    });
}



export {
    toastError,toastSuccess,enskripsi,deskripsi,dataURLToBlob
}