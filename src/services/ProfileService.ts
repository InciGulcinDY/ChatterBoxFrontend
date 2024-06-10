import { UserModel } from "../models/UserModel";
import axiosInstance from "../utils/interceptors/axiosInterceptors";


class ProfileService {

    getProfile(token: string): Promise<UserModel> {
        return axiosInstance.get<UserModel>(`/users/getProfile`, {
            headers: {
                Authorization: `${token}`
            }
        })
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
    }

}

export default new ProfileService();