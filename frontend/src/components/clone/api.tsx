import axios from "axios";

const API_URL = '';

const api = axios.create({
    baseURL: API_URL
})

export const aetAuthToken = (token: string | null) => {
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export default api;