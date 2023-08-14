const product = require("../models/product.model");
const responseClass = require("../utils/responseClass");

const getAll = async (req, res) => {
    try {
        const allProducts = await product.findAll();
        const resObj = new responseClass();
        if(allProducts.length <= 0){
            resObj.statusCode = 200;
            resObj.message = "No products found.";
            resObj.error = false;

            res.status(resObj.statusCode).json(resObj);
        }
        else{
            resObj.statusCode = 200;
            resObj.message = "Returning all products.";
            resObj.error = false;
            resObj.data = allProducts;

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
        const {ProductId, Name, Weight, HsnNo, TaxId, Stock} = req.body;
        const resObj = new responseClass();

        const newProduct = await product.create({
            PM_ID: ProductId,
            PM_NAME: Name,
            PM_WEIGHT: Weight,
            PM_HSN_NO: HsnNo,
            PM_TAX_ID: TaxId,
            PM_STOCK: Stock,
        });

        resObj.data = newProduct;
        resObj.message = "New Product Successfully created";
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
    register
}