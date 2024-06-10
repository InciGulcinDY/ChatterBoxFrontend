import axios from "axios";
import { MessageModel } from "../models/MessageModel";
import { RegisterUserModel } from "../models/RegisterUserModel";
import { SuccessResponse } from "../models/SuccessResponse";
import { LoginUserModel } from "../models/LoginUserModel";
import axiosInstance from '../utils/interceptors/axiosInterceptors';

const baseURL = "http://localhost:8080/api/users";


const register = async (request: RegisterUserModel) => {

        return axios.post(`${baseURL}/register`, request).then(response => {
            console.log(response + ": Register Successful");
            return response;
        })
        .catch(error => {
            console.log(error + ": Something went wrong.");
            return { data: { success: false, message: "Something went wrong." } };
        })  

}


const login = async(request: LoginUserModel) => {
    return axiosInstance.post(`${baseURL}/login`, request).then(response => {
        console.log(response+": Login Successful");
        return response;
    })
    .catch(error => {
        console.log(error + ": Something went wrong.");
        return { data: { success: false, message: "Something went wrong." } };
    })
}

const UserService = {
    register,
    login
}

export default UserService;