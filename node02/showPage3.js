const http = require("http");
const fs = require("fs");
const path = require("path")//对路径处理的内置模块
var ser =http.createServer((req,res)=>{
    if(req.url==="/favicon.ico") return;//不处理 /favicon.ico请求
    var url = ''
    if(req.url === "/"){
        url="./a.html";//默认home页面
    }
    else{
        //  url = '.'+req.url;//./a.html ./b.html ....
        url = path.join('.',req.url)//相对路径
        
    }
   
    res.writeHead(200,{"content-type":"text/html;charset=utf-8"});
    //读取文件内容
    // var content = fs.readFileSync("./a.html","utf-8");
    // //并把文件的内容发给客户端
    // res.end(content);

    //异步的方式
    // fs.readFile("./a.html","utf-8",(err,data)=>{
    //     if(!err){
    //         res.end(data)
    //     }
    // })
    console.log(req.url);
    fs.stat(url,(err,info)=>{//读取文件的状态
        if(!err){
            fs.createReadStream(url).pipe(res);
        }
        else{//如果读文件出错了
            res.end("文件不存在哦...")
        }
    })//读取文件的状态
    // fs.createReadStream(url).pipe(res)
})
ser.listen(4000,()=>{
    console.log("listen 4000...")
})