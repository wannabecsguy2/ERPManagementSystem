const {DataTypes} = require("sequelize");
const sequelize = require("../utils/dbConnSetup");

const ocItem = sequelize.define("ORDER_CONFIRMATION_ITEMS", {
    OCI_OC_ID: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    OCI_PRODUCT_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    OCI_QUANTITY: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    OCI_UNIT: {
        type: DataTypes.STRING,
    },
    OCI_PRICE: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

module.exports = ocItem;