import axios from "axios"
import AuthHeader from './Auth.header'

const API_URL = 'http://localhost:5500/api/v1/'

const UserServices ={

    getUserDash(){
        return axios.get(API_URL + 'user/dash', {header : AuthHeader()})
}

}

export default UserServices
