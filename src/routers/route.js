const express = require('express')
const router = new express.Router()
const employee = require("../models/employee")
const { validateSignup } = require("../validation/validator")

// const validationMiddleware = (req,res,next)=>{
//     const schema = joi.object({
//         name: joi.string().alphanum().min(3).max(25).trim(true).required(),
//         email: joi.string().email().trim(true).required(),
//         phone: joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required()
//     });
//     const {error} = schema.validate(req.body);
//     if(error){
//         res.status(400).json({error})
//         console.log(error(details.message))
//     }
//     next();
// }

// create a new employee

router.post("/employee", async (req, res) => {
    const { error } = validateSignup(req.body);

    if (error) {
        //   console.log(error);
        res.status(400)
        return res.send(error.details[0].message);
    }
    const emp = new employee(req.body);

    const email = await employee.findOne({ email: req.body.email });
    if (email) { res.status(409).send("Email already exist"); }

    emp.save().then(() => {
        res.status(200).send({message:`${emp.name},congratulations Your Data Added Successfully..!!!`}); 

    }).catch((e) => {
        res.status(400).send(e)
    })
});

// get the data

router.get("/employee", async (req, res) => {
    try {
        const getdata = await employee.find({});
        res.status(200).send({message:"Succeessfully listed",data:getdata});
    } catch (e) {
        res.status(400).send(e)
    }
});

// get specific data using id 

router.get("/employee/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const getSingleData = await employee.findById({ _id });
        res.status(200).send(getSingleData);
    } catch (e) {
        res.status(400).send(e)
    }
});

// update data in database

router.patch("/employee/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const updateData = await employee.findByIdAndUpdate(_id, req.body, { new: true });
        res.status(200).send({message:`${updateData.name} your Data Updated Successfully.!!`}) ;
    } catch (e) {
        res.status(500).send(e)
    }
});

// delete data in database

router.delete("/employee/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const deleteData = await employee.findByIdAndDelete(_id);
        res.status(200).send({message:`${deleteData.name} your Data Deleted Successfully.!!`});
    } catch (e) {
        res.status(400).send(e)
    }
});

// export module and import in main app.js file
module.exports = router