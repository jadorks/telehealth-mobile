import axios from "axios";

export const client = axios.create({
    baseURL: 'http://10.0.2.2:8000/api/v1/'
});