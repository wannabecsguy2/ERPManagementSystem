const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("../utils/dbConnSetup");

const rawMaterial = sequelize.define('RAW_MATERIALS_MASTER', {
    RMM_ID: {
        unique: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: "Unique Id of the raw material",
    },
    RMM_NAME: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Name of the raw material",
    },
    RMM_HSN_NO: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "HSN Number of the raw material",
    },
    RMM_TAX_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Tax Rate on the raw material",
    },
    RMM_STOCK: {
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: "Stock level of the raw material"
    }
});

module.exports = rawMaterial;