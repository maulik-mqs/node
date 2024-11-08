const mongoose = require("mongoose");
const validator = require("validator")



const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        // required:true,
    },
    email: {
        type: String,
        // required:true,
        // unique:[true,'Email id already present!!!'],
        // validate(value){
        //     if(!validator.isEmail(value)){
        //         throw new Error("Invalid Email..!!!")
        //     }
        // }
    },
    password: {
        type: String,
    },
    phone: {
        type: Number,

    },
    city: {
        type: String
    }
});



// we will create a new colleation

const employee = new mongoose.model('Employee-api', employeeSchema)
module.exports = employee;