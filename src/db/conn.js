const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/employee-api",{
    // keepAlive: true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connected!!!!")
}).catch((e)=>{
    console.log("Disconnected..!!!",e)
})

