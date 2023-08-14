const rawMaterial = require("../models/rawMaterial.model");
const responseClass = require("../utils/responseClass");
const product = require("../models/product.model");

const getAll = async (req, res) => {
    try {
        const allRawMaterials = await rawMaterial.findAll();
        const resObj = new responseClass();

        if (allRawMaterials.length <= 0){
            resObj.statusCode = 200;
            resObj.message = "No raw materials found.";
            resObj.error = false;

            res.status(resObj.statusCode).json(resObj);
        }
        else {
            resObj.statusCode = 200;
            resObj.error = false;
            resObj.message = "Returning all raw materials."
            resObj.data = allRawMaterials;

            res.status(resObj.statusCode).json(resObj);
        }
    } catch (e) {
        const resObj = new responseClass();

        resObj.statusCode = 500;
        resObj.message = "Server Error occurred. Please try again later."
        resObj.data = e.toString();
        resObj.error = true

        res.status(resObj.statusCode).json(resObj);
    }
}
const register = async (req, res) => {
    try {
        const {RawMaterialId, Name, HsnNo, TaxId, Stock} = req.body;
        const resObj = new responseClass();

        const newRawMaterial = await rawMaterial.create({
            RMM_ID: RawMaterialId,
            RMM_NAME: Name,
            RMM_HSN_NO: HsnNo,
            RMM_TAX_ID: TaxId,
            RMM_STOCK: Stock,
        });

        resObj.data = newRawMaterial;
        resObj.message = "New Raw Material Successfully created";
        resObj.statusCode = 200;

        res.status(resObj.statusCode).json(resObj);
    } catch (e) {
        const resObj = new responseClass();

        resObj.statusCode = 500;
        resObj.message = "Server Error occurred. Please try again later."
        resObj.data = e.toString();
        resObj.error = true

        res.status(resObj.statusCode).json(resObj);
    }
}
module.exports = {
    getAll,
    register,
}