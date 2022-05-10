import axios from "axios";

export const client = axios.create({
    baseURL: 'http://d132-154-160-4-87.ngrok.io/api/v1/'
});