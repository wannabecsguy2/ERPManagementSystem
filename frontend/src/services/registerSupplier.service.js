import axiosInstance from "../utils/axiosInstance";

export const getAllRawMaterials = async () => {
    try{
        const response = await axiosInstance.post("/rawMaterials/getAll");
        return response.data;
    } catch (e) {
        return "No response";
    }
}

export const registerSupplier = async (Name, DelAdd, SerAdd, Email, PhoneNo, GstNo, RawMaterials) => {
    try{
        const RawMaterialReq = []
        RawMaterials.forEach((rawMaterialID) => {
            RawMaterialReq.push({ID: rawMaterialID})
        });
        const request = {
            Name: Name,
            DelAdd: DelAdd,
            SerAdd: SerAdd,
            Email: Email,
            PhoneNo: PhoneNo,
            GstNo: GstNo,
            RawMaterials: RawMaterialReq,
        }
        const response = await axiosInstance.post("/suppliers/register", request);
        return response;
    } catch (e) {
        console.log(e)
    }


}