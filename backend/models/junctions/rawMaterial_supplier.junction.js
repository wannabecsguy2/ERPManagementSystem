//Junction table between Raw Materials and Suppliers
const {DataTypes} = require("sequelize");
const sequelize = require("../../utils/dbConnSetup");

const juncRmmSm = sequelize.define("RMM_SM_JUNC", {

});

module.exports = juncRmmSm;