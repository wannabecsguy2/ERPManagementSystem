const rawMaterial = require("../models/rawMaterial.model");
const taxRate = require("../models/taxRate.model");
const product = require("../models/product.model");
const supplier = require("../models/supplier.model");
const buyer = require("../models/buyer.model");
const orderConfirmation = require("../models/orderConfirmation.model");
const purchaseOrder = require("../models/purchaseOrder.model");
const paymentTerm = require("../models/paymentTerm.model");
const ocItem = require("../models/orderConfirmationItem.model");
const poItem = require("../models/purchaseOrderItem.model");

const juncPmBm = require("../models/junctions/product_buyer.junction")
const juncRmmSm = require("../models/junctions/rawMaterial_supplier.junction");

const defineAllRelations = () => {
    // Each raw material has a tax rate. One (taxRate) to Many (rawMaterial)
    rawMaterial.belongsTo(taxRate, {foreignKey: "RMM_TAX_ID", targetKey:"TM_ID"});
    taxRate.hasMany(rawMaterial, {foreignKey: "RMM_TAX_ID", sourceKey:"TM_ID"});

    // Each product has a tax Rate. One (taxRate) to Many (product)
    product.belongsTo(taxRate, {foreignKey: "PM_TAX_ID", targetKey: "TM_ID"});
    taxRate.hasMany(product, {foreignKey: "PM_TAX_ID", sourceKey: "TM_ID"});

    // All suppliers can have many raw materials to provide. Many (supplier) to Many (rawMaterial)
    supplier.belongsToMany(rawMaterial, {through: juncRmmSm});
    rawMaterial.belongsToMany(supplier, {through: juncRmmSm});

    // All buyers can have many products to buy. Many (buyer) to Many (product)
    buyer.belongsToMany(product, {through: juncPmBm});
    product.belongsToMany(buyer, {through: juncPmBm});

    // Each Order Confirmation has a Buyer. One (buyer) to Many (orderConfirmation)
    orderConfirmation.belongsTo(buyer, {foreignKey: "OC_BUYER_ID", targetKey: "BM_ID"});
    buyer.hasMany(orderConfirmation, {foreignKey: "OC_BUYER_ID", sourceKey: "BM_ID"});

    // Each Order Confirmation has a payment term. One (paymentTerm) to Many (orderConfirmation)
    orderConfirmation.belongsTo(paymentTerm, {foreignKey: "OC_PT_ID", targetKey: "PTM_ID"});
    paymentTerm.hasMany(orderConfirmation, {foreignKey: "OC_PT_ID", sourceKey: "PTM_ID"});

    // Each Order Confirmation item has an order confirmaton. One (orderConfirmation) to Many (ocItem)
    ocItem.belongsTo(orderConfirmation, {foreignKey: "OCI_OC_ID", targetKey: "OC_ID"});
    orderConfirmation.hasMany(ocItem, {foreignKey: "OCI_OC_ID", sourceKey: "OC_ID"});

    // Each Order Confirmation item has a product Id. One (product) to Many (ocItem)
    ocItem.belongsTo(product, {foreignKey: "OCI_PRODUCT_ID", targetKey: "PM_ID"});
    product.hasMany(ocItem, {foreignKey: "OCI_PRODUCT_ID", sourceKey: "PM_ID"});

    // Each purchase order can have purchase order items. One (purchaseOrder) to Many (poItem)
    poItem.belongsTo(purchaseOrder, {foreignKey: "POI_PO_ID", targetKey: "PO_ID"});
    purchaseOrder.hasMany(poItem, {foreignKey: "POI_PO_ID", sourceKey:"PO_ID"});

    // Each purchase order has one buyer. One (supplier) to Many (purchaseOrder)
    purchaseOrder.belongsTo(supplier, {foreignKey: "PO_SUPPLIER_ID", targetKey: "SM_ID"});
    supplier.hasMany(purchaseOrder, {foreignKey: "PO_SUPPLIER_ID", sourceKey: "SM_ID"});

    // Each item is a raw material
    poItem.belongsTo(rawMaterial, {foreignKey: "POI_RAW_MATERIAL_ID", targetKey:"RMM_ID"});
    rawMaterial.hasMany(poItem, {foreignKey:"POI_RAW_MATERIAL_ID", sourceKey:"RMM_ID"});
}

module.exports = defineAllRelations