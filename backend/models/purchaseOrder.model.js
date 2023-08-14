const {DataTypes, Sequelize} = require("sequelize");
const sequelize = require("../utils/dbConnSetup");

const purchaseOrder = sequelize.define("PURCHASE_ORDER", {
    PO_ID: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    PO_SUPPLIER_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    PO_DOC_NO: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    PO_DOC_DATE: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    PO_DEL_DATE: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

module.exports = purchaseOrder;