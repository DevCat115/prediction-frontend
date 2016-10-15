import { io } from "socket.io-client";

const URL = "https://prediction.prolocalize.com";
// const URL = "http://127.0.0.1:4000/";

export const socket = io(URL);
