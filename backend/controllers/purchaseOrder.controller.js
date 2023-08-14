const purchaseOrder = require("../models/purchaseOrder.model");
const poItem = require("../models/purchaseOrderItem.model");
const responseClass = require("../utils/responseClass");

const getAll = async (req, res) => {
    try{
        const allPurchaseOrders = await purchaseOrder.findAll({
            include: poItem,
        });
        const resObj = new responseClass();

        if(allPurchaseOrders.length <= 0){
            resObj.statusCode = 200;
            resObj.message = "No purchase orders found.";
            resObj.error = false;

            res.status(resObj.statusCode).json(resObj);
        }
        else{
            resObj.statusCode = 200;
            resObj.message = "Returning all purchase orders";
            resObj.error = false;
            resObj.data = allPurchaseOrders;

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
        const resObj = new responseClass();
        resObj.statusCode = 200;
        resObj.error = false;
        resObj.message = "Endpoint hit successfully"

        const {SupplierId, DocNo, DocDate, DelDate, RawMaterials} = {...req.body};

        console.log(RawMaterials);

        const newPo = await purchaseOrder.create({
            PO_SUPPLIER_ID: SupplierId,
            PO_DOC_NO: DocNo,
            PO_DOC_DATE: Date.parse(DocDate),
            PO_DEL_DATE: Date.parse(DelDate),
        });

        poId = newPo.dataValues.PO_ID;

        RawMaterials.forEach(async (RawMaterial) => {
            await poItem.create({
                POI_PO_ID: poId,
                POI_RAW_MATERIAL_ID: RawMaterial.ID,
                POI_QUANTITY: RawMaterial.Quantity,
                POI_PRICE: RawMaterial.Price,
            })
                .then((response) => {console.log(response);})
                .catch((error) => {console.error(error);});
        });

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