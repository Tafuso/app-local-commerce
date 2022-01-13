import axios from 'axios'

const api = axios.create({
  baseURL: "https://api-local-commerce.herokuapp.com"
}) 

export default api