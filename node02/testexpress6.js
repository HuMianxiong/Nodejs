const express = require("express");
const path = require("path")
const app = express()//实例化,相当于得到了一个服务器

app.use(express.static(path.join(__dirname,'public')));//使用中间件 static 把当前目录下的public变为静态资源目录
//路由
app.get("/",(req,res)=>{
    res.redirect("/hello") //重定向
})
app.get('/hello',(req,res)=>{//监听 /hello的get请求，返回一段文本
    res.send("Hello World");
})

app.get("*",(req,res)=>{ //404的处理
    res.send("页面没找到")
})
app.listen(3000,()=>{//监听到3000端口
    console.log("listen 3000...")
})

// ser.get("/",(req,res)=>{
//     res.send("hello world");
// })

// ser.listen(3000,()=>{
//     console.log("listen 3000...")
// })

