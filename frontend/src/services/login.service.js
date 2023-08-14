import axiosInstance from "../utils/axiosInstance";

export const login = async (email, password) => {
    try{
        const reqBody = {
            email: email,
            password: password,
        }
        const response = await axiosInstance.post("/users/login", reqBody);
        return response.data;
    } catch (e) {
        console.log(e.response.data.message);
        return e.response.data;
    }
}

