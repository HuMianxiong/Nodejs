const express = require("express")

const app = express();//实例化 new Xxx

//处理静态资源
app.use(express.static("./public")) //中间件

//当用户发起请求 / 时候，返回hello

app.get("/",(req,res)=>{
    console.log(req)
    // res.send("hello 你好") 
    res.redirect("/add") //重定向
})

app.get("/add",(req,res)=>{
    res.send("添加功能")
})

app.get("/remove",(req,res)=>{
    res.send("删除功能")
})

app.listen(2000,()=>{
    console.log("listen 2000...")
})



