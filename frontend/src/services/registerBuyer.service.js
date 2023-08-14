import axiosInstance from "../utils/axiosInstance";

export const getAllProducts = async () => {
    try{
        const response = await axiosInstance.post("/products/getAll");
        return response.data;
    } catch (e) {
        return "No response";
    }
}

export const registerBuyer = async (Name, DelAdd, SerAdd, Email, PhoneNo, GstNo, Products) => {
    try{
        const ProductReq = []
        Products.forEach((productID) => {
            ProductReq.push({ID: productID})
        });
        const request = {
            Name: Name,
            DelAdd: DelAdd,
            SerAdd: SerAdd,
            Email: Email,
            PhoneNo: PhoneNo,
            GstNo: GstNo,
            Products: ProductReq,
        }
        const response = await axiosInstance.post("/buyers/register", request);
        return response;
    } catch (e) {
        console.log(e)
    }


}