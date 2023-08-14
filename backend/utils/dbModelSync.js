const {Sequelize, DataTypes} = require("sequelize");
const defineAllRelations = require("./dbRelations");
const sequelize = require("./dbConnSetup");

const syncModels = async () => {
    try{
        defineAllRelations();
        await sequelize.sync({alter:false});
        console.log("Database Synced Successfully");
    } catch(error) {
        console.error(error);
    }
}

module.exports = syncModels;