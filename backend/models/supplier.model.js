const {DataTypes} = require("sequelize");

const sequelize = require("../utils/dbConnSetup");

const supplier = sequelize.define("SUPPLIERS_MASTER", {
    SM_ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    SM_NAME: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    SM_DEL_ADD: {
        type: DataTypes.STRING,
    },
    SM_SER_ADD: {
        type:DataTypes.STRING,
    },
    SM_EMAIL: {
        type:DataTypes.STRING,
        validate:{
            isEmail: {
                msg: 'Please provide a valid email address'
            }
        }
    },
    SM_PHONE_NO: {
        type:DataTypes.STRING,
    },
    SM_GST_NO: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    SM_GST_DETAILS: {
        type: DataTypes.STRING,
    },
});

module.exports = supplier;