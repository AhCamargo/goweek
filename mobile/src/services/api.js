import axios from "axios";

//10.0.2.2:3000 localhost no androisStudio
//10.0.3.2:3000 localhost no Genymotion

const api = axios.create({
    baseURL: 'http://10.0.3.2:3000',
});

export default api;