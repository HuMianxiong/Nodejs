const fs = require("fs");
//同步
// fs.writeFileSync("./a.txt","hello你好","utf-8");
//异步
// fs.writeFile("./a.txt","world","utf-8",(err)=>{
//     if(!err){
//         console.log("写入成功")
//     }
// })

//流
// var ws = fs.createWriteStream("./a.txt");
// ws.write("666666","utf-8")

fs.appendFileSync("./a.txt","111","utf-8")