import axiosInstance from "../utils/axiosInstance";

export const getAllSuppliers = async () => {
    try {
        const allSuppliers = await axiosInstance.post("/suppliers/getAll");
        return allSuppliers.data;
    } catch (e) {
        return "No response";
    }
}

export const registerPurchaseOrder = async (SupplierId, DocNo, DocDate, DelDate, RawMaterials) => {
    try{
        
    } catch (e) {
        
    }
}
