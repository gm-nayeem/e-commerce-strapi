import axios from "axios";
import {REACT_APP_API_TOKEN, REACT_APP_API_URL} from "../private";

export const makeRequest = axios.create({
    baseURL: REACT_APP_API_URL,
    headers: {
        Authorization: "bearer " + REACT_APP_API_TOKEN,
    },
});