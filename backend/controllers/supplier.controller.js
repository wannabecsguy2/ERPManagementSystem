const supplier = require("../models/supplier.model");
const rawMaterial = require("../models/rawMaterial.model");
const juncRmSm = require("../models/junctions/rawMaterial_supplier.junction")
const responseClass = require("../utils/responseClass");

const getById = async (req, res) => {
    try {
        const supplierID = req.param.id;
        const supplierDetails = await supplier.findByPk(supplierID);

        if (!supplierDetails) {
            return res.status(404).json({error: 'supplier not found'});
        }
        return res.json(supplierDetails);
    } catch (e) {
        return res.status(500).json({error: `Internal server error ${e.toString()}`});
    }
}

const getAll = async (req, res) => {
    try {
        const allSuppliers = await supplier.findAll({include:rawMaterial});
        const resObj = new responseClass();

        if(allSuppliers.length <= 0){
            resObj.statusCode = 200;
            resObj.error = false;
            resObj.message = "No suppliers found.";
            res.status(resObj.statusCode).json(resObj);
        }
        else{
            resObj.statusCode = 200;
            resObj.error = false;
            resObj.message = "Returning all suppliers"
            resObj.data = allSuppliers;

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

        const {Name, DelAdd, SerAdd, Email, PhoneNo, GstNo, RawMaterials} = {...req.body};
        console.log(RawMaterials);
        const newSupplier = await supplier.create({
            SM_NAME: Name,
            SM_DEL_ADD: DelAdd,
            SM_SER_ADD: SerAdd,
            SM_EMAIL: Email,
            SM_PHONE_NO: PhoneNo,
            SM_GST_NO: GstNo,
        });
        const rawMaterialIDs = RawMaterials.map((rawMaterial) => rawMaterial.ID);
        const rawMaterials = await rawMaterial.findAll({
            where: {RMM_ID: rawMaterialIDs}
        });
        console.log(newSupplier.dataValues.SM_ID);
        rawMaterialIDs.forEach(async (rawMaterialID) => {
            await juncRmSm.findOrCreate({
                where: {
                    SUPPLIERSMASTERSMID: newSupplier.dataValues.SM_ID,
                    RAWMATERIALSMASTERRMMID: rawMaterialID
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
        resObj.statusCode = 500
        resObj.error = true;
        resObj.message = "Server Error occurred, please try again later."
        res.status(resObj.statusCode).json(resObj);
    }
}

module.exports = {
    getById,
    getAll,
    register,
}