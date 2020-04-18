const http = require("http");

var ser = http.createServer((req,res)=>{ //创建了一个服务器 req 请求对象 res 响应对象
    res.writeHead(200,{
        "content-type":"text/html;charset=utf-8" //返回过来的内容类型
    });
    res.end("hello world 闭关修炼");

})

ser.listen(3001,()=>{//服务器在3000端口监听
    console.log("listen 3000")
})