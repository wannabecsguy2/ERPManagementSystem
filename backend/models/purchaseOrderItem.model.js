const {DataTypes} = require("sequelize");
const sequelize = require("../utils/dbConnSetup");

const poItem = sequelize.define("PURCHASE_ORDER_ITEMS", {
    POI_PO_ID: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    POI_RAW_MATERIAL_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    POI_QUANTITY: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    POI_PRICE: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
})

module.exports = poItem;