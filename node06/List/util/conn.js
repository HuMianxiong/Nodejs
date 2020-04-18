const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/stumanage",(err)=>{
    if(!err){
        console.log("连接成功")
    }
    else{
        console.log("连接失败")
    }
})
module.exports = mongoose