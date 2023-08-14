const {DataTypes} = require("sequelize");
const sequelize = require("../utils/dbConnSetup");

const product = sequelize.define("PRODUCTS_MASTER", {
    PM_ID: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    PM_NAME: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    PM_WEIGHT: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    PM_HSN_NO: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    PM_TAX_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    PM_STOCK: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.exports = product;