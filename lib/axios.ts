import axios from 'axios'

export default axios.create({
    baseURL: process.env.BASE_API_URL,
    timeout: 30000,
});
