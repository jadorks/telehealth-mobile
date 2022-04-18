import axios from "axios";
// import Constants from "expo-constants";

// const { manifest } = Constants;

// const url = (typeof manifest.packagerOpts === 'object') && manifest.packagerOpts.dev ? manifest.debuggerHost.split(':').shift().concat(':8000/api/v1') : '192.168.0.157:8000/api/v1'

export const client = axios.create({
    baseURL: 'http://758a-154-160-21-242.ngrok.io/api/v1/'
});