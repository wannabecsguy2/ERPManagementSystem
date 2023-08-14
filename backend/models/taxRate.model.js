const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("../utils/dbConnSetup");

const taxRate = sequelize.define("TAXES_MASTER", {
    TM_ID: {
        unique: true,
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
    },
    TM_RATE: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

module.exports = taxRate;