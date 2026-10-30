import axios from "axios";

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL?.trim() || "http://10.0.2.2:8184",
    headers: {
        "Content-Type": "application/json",
    },
});

// Guarda o token em memória (sem persistência) e anexa em toda requisição
let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
    authToken = token;
};

api.interceptors.request.use((config) => {
    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
});

export default api;
