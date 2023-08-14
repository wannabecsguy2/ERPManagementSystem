const {DataTypes, Sequelize} = require("sequelize");
const sequelize = require("../utils/dbConnSetup");

const orderConfirmation = sequelize.define("ORDER_CONFIRMATIONS", {
    OC_ID: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    OC_BUYER_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    OC_DOC_NO: {
        type: DataTypes.STRING,
        allowNull: false
    },
    OC_DOC_DATE: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    OC_DEL_DATE: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    OC_PO_NO: {
        type: DataTypes.STRING,
    },
    OC_PO_DATE: {
        type: DataTypes.DATE,
    },
    OC_PT_ID: {
        type: DataTypes.INTEGER,
    },
});

module.exports = orderConfirmation;