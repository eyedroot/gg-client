import axios from "axios"

const ping = axios.create({
  baseURL: "http://localhost:21868/api/ping",
  headers: {
    "Content-type": "application/json",
  }
})

export default ping
