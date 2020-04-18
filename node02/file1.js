const fs = require("fs")

// // fs.readFile("./a.txt","utf-8",(err,data)=>{
// //     console.log(err,data)
// // })

// var rs = fs.createReadStream("./a.txt")
// var body = "";
// rs.on("data",(data)=>{ //读取每一块数据都会发生data事件
//     body+=block;
// })
// rs.on("end",()=>{ //读完了发生end事件
//     console.log(body);
// })

//拷贝文件
var rs = fs.createReadStream("./a.txt");//创建一个读取流
var ws = fs.createWriteStream("./acopy.txt");//创建一个写入流
rs.pipe(ws)//把读取的内容以流的方式写入到文件里 