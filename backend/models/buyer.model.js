const {DataTypes} = require("sequelize");
const sequelize = require("../utils/dbConnSetup");

const buyer = sequelize.define("BUYERS_MASTER", {
    BM_ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    BM_NAME: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    BM_DEL_ADD: {
        type: DataTypes.STRING,
    },
    BM_SER_ADD: {
        type:DataTypes.STRING,
    },
    BM_EMAIL: {
        type:DataTypes.STRING,
        validate:{
            isEmail: {
                msg: 'Please provide a valid email address'
            }
        }
    },
    BM_PHONE_NO: {
        type:DataTypes.STRING,
    },
    BM_GST_NO: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    BM_GST_DETAILS: {
        type: DataTypes.STRING,
    },
});

module.exports = buyer;