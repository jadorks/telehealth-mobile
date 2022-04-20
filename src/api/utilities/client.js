import axios from "axios";
import Constants from "expo-constants";

const { manifest } = Constants;

const url = (typeof manifest.packagerOpts === 'object') && manifest.packagerOpts.dev ? manifest.debuggerHost.split(':').shift().concat(':8000/api/v1') : '192.168.8.144:8000/api/v1'

export const client = axios.create({
    baseURL: 'http://37a3-154-160-19-139.ngrok.io/api/v1/'
});