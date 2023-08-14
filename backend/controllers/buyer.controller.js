const buyer = require("../models/buyer.model");
const product = require("../models/product.model");
const juncPmBm = require("../models/junctions/product_buyer.junction")
const responseClass = require("../utils/responseClass");

const getById = async (req, res) => {
    try {
        const buyerID = req.param.id;
        const buyerDetails = await buyer.findByPk(buyerID);

        if (!buyerDetails) {
            return res.status(404).json({error: 'Buyer not found'});
        }
        return res.json(buyerDetails);
    } catch (e) {
        return res.status(500).json({error: `Internal server error ${e.toString()}`});
    }
}

const getAll = async (req, res) => {
    try {
        const allBuyers = await buyer.findAll({include:product});
        const resObj = new responseClass();

        if(allBuyers.length <= 0){
            resObj.statusCode = 200;
            resObj.error = false;
            resObj.message = "No buyers found.";
            res.status(resObj.statusCode).json(resObj);
        }
        else{
            resObj.statusCode = 200;
            resObj.error = false;
            resObj.message = "Returning all buyers"
            resObj.data = allBuyers;

            res.status(resObj.statusCode).json(resObj);
        }
    } catch (e) {
        console.log(e);
        const resObj = new responseClass();
        resObj.statusCode = 500;
        resObj.message = "Server error occured. Please try again later."
        resObj.error = true;

        res.status(resObj.statusCode).json(resObj);
    }
}
const register = async (req, res) => {
    try{
        const resObj = new responseClass();
        resObj.statusCode = 200
        resObj.error = false;
        resObj.message = "Endpoint hit successfully"

        const {Name, DelAdd, SerAdd, Email, PhoneNo, GstNo, Products} = {...req.body};
        console.log(Products);
        const newBuyer = await buyer.create({
            BM_NAME: Name,
            BM_DEL_ADD: DelAdd,
            BM_SER_ADD: SerAdd,
            BM_EMAIL: Email,
            BM_PHONE_NO: PhoneNo,
            BM_GST_NO: GstNo,
        });
        const productIDs = Products.map((product) => product.ID);
        const products = await product.findAll({
            where: {PM_ID: productIDs}
        });
        console.log(newBuyer.dataValues.BM_ID);
        productIDs.forEach(async (productID) => {
            await juncPmBm.findOrCreate({
                where: {
                    BUYERSMASTERBMID: newBuyer.dataValues.BM_ID,
                    PRODUCTSMASTERPMID: productID
                }
            })
                .then((response) => console.log(response))
                .catch((error) => console.log(error))
        })

        // resObj.data = newBuyer;
        res.status(200).json(resObj);
    } catch (e) {
        console.log(e);
        const resObj = new responseClass();
        resObj.statusCode = 500;
        resObj.message = "Server error occured. Please try again later."
        resObj.error = true;

        res.status(resObj.statusCode).json(resObj);
    }
}

module.exports = {
    getById,
    getAll,
    register,
}