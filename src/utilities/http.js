import axios from "axios"

const http = axios.create({
    baseURL: "https://phpgg.kr/api",
    headers: {
        "Content-type": "application/json",
    },
})

export default http
