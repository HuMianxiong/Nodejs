const http = require("http");
const fs = require("fs")
const path = require("path")

var ser = http.createServer((req, res) => {
    //接受用户的请求，进行处理，并且把处理的结果返回给客户端
    console.log(req.url);
    if(req.url === "/favicon.ico") return;
    res.writeHead(200, {
        "content-type": "text/html;charset=utf-8"
    })
    //res.end("hello 我")
    //用write表示还没发送完

    //路由功能
    // if(req.url === "/add"){
    //     res.end("添加功能")
    // }
    // else if(req.url === '/remove'){
    //     res.end("删除功能")
    // }

    //如果用户访问的是静态资源，可以用fs读取文件的内容，并把内容返回给客户端
    // var content = fs.readFileSync("./public/a.html","utf-8");
    // fs.readFile("./public/"+req.url, "utf-8", (err, data) => {
    //     if (!err) {
    //         res.end(data)
    //     } else {
    //         res.end("没有找到了")
    //     }
    // })
    fs.readFile(path.join(__dirname,"public",req.url),"utf-8",(err,data)=>{
        if(!err){
            res.end(data)
        }
        else{
            res.end("没有找到")
        }
    })
    // res.end(content)
})
ser.listen(4000, () => { //在3000端口监听
    console.log("listen 4000...");
})