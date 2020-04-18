var mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/demo3",(err)=>{
    if(!err){
        console.log('连接成功')
    }
    else{
        console.log('连接失败')
    }
})//连接数据库，如果连接的数据库不存在，就会创建这个数据库
module.exports = mongoose