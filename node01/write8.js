const fs = require("fs")

//异步
fs.readFile("./a.txt","utf-8",(err,data)=>{
    if(!err){
        console.log(data)
    }
   
})

//同步
var content = fs.readFileSync("./a.txt","utf-8")
console.log(content)

//流的方式
var rs = fs.createReadStream("./a.txt");
var body = ""
rs.on("data",(thunk)=>{
    console.log(thunk)
    //读取一块内容
    body+=thunk;
    console.log(body)
})

rs.on("end",()=>{
    //end 事件表示读完了
    console.log(body)
})
