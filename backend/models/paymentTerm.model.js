const {DataTypes} = require("sequelize");
const sequelize = require("../utils/dbConnSetup");

const paymentTerm = sequelize.define("PAYMENT_TERMS_MASTER", {
    PTM_ID: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    PTM_NAME: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = paymentTerm;