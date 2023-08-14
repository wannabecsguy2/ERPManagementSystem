const sequelize = require("../utils/dbConnSetup");
const {DataTypes} = require("sequelize");

const user = sequelize.define("USERS_MASTER", {
    UM_ID: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    UM_NAME: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    UM_EMAIL: {
        allowNull: false,
        type: DataTypes.STRING,
        validate:{
            isEmail: {
                msg: 'Please provide a valid email address'
            }
        }
    },
    UM_PASSWORD_HASH: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    UM_SALT: {
        type: DataTypes.STRING,
    },
    UM_ROLE: {
        type: DataTypes.INTEGER,
    },
});

module.exports = user