const user = require("../models/user.model");
const bcrypt = require("bcrypt");
const responseClass = require("../utils/responseClass");

const registerUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const resObject = new responseClass();
        const existingUser = await user.findAll({
            where:{
                UM_EMAIL: email
            }
        });

        if(existingUser.length > 0){
            resObject.statusCode = 400;
            resObject.error = false;
            resObject.message = "User already exists";

            res.status(resObject.statusCode).json(resObject);
            return res;
        }
        const newUser = await user.create({
            UM_NAME: name,
            UM_EMAIL: email,
            UM_PASSWORD_HASH: hashPassword,
            UM_SALT: salt,
            UM_ROLE: 0,
        });
        resObject.statusCode = 200;
        resObject.error = false;
        resObject.message = "User registered successfully";

        res.status(resObject.statusCode).json(resObject);
    } catch (e) {
        const resObject = new responseClass();
        resObject.statusCode = 500;
        resObject.message = "Server Error occurred. Please try again later."
        resObject.data = e.toJSON();
        resObject.error = true
        res.status(resObject.statusCode).json(resObject);
    }
}
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const existingUser = await user.findOne({
            where: {
                UM_EMAIL: email
            }
        });
        const resObject = new responseClass();

        if(!existingUser){
            resObject.statusCode = 400;
            resObject.message = "Invalid Credentials.";
            resObject.error = false;

            res.status(resObject.statusCode).json(resObject);
        }
        else{

            bcrypt.compare(password, existingUser.UM_PASSWORD_HASH, (err, result) => {
                if (err) {
                    console.log(err)
                    resObject.statusCode = 500;
                    resObject.message = "Server Error occurred. Please try again later."
                    resObject.data = err.toJSON();
                    resObject.error = true
                    res.status(resObject.statusCode).json(resObject);

                }
                else if(result) {
                    resObject.statusCode = 200;
                    resObject.message = `User logged in successfully.`;
                    resObject.error = false;
                    res.status(resObject.statusCode).json(resObject);
                }
                else{
                    resObject.statusCode = 400;
                    resObject.message = `Invalid credentials.`;
                    resObject.error = false;
                    res.status(resObject.statusCode).json(resObject);
                }
            });
        }
    } catch (e) {
        const resObject = new responseClass();
        resObject.statusCode = 500;
        resObject.message = "Server Error occurred. Please try again later."
        resObject.data = e.toJSON();
        resObject.error = true
        res.status(resObject.statusCode).json(resObject);
    }
}
module.exports = {
    registerUser,
    loginUser,
}