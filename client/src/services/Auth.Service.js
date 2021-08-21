import axios from 'axios'

const API_URL = "http://localhost:5500/api/v1/user/";

const AuthService = {
    signup(credentials){
        return axios.post(`${API_URL}signup`, credentials)
    },
    login(credentials){
        return axios.post(`${API_URL}login`, credentials)
    },
    logout(){
        return localStorage.removeItem('token')
    },
    getCurrentUser(){
        return JSON.parse(localStorage.getItem('token'))
    }
}

export default AuthService