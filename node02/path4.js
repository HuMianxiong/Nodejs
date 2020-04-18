const path = require("path");

 console.log(path.join(__dirname,"/a.html"))//C:\QianfengHtml5\Nodejs\node02\a.html
console.log(path.join("../","a.html"));
//..\a.html
console.log(path.resolve(path.resolve("../","a.html")))//C:\QianfengHtml5\Nodejs\a.html

console.log(path.resolve("/a","/b","/c",'/a.html'))//解析参数为一个绝对路径 相当于cd命令

console.log(path.resolve(__dirname,'dist'));//返回当前目录下的dist子目录的绝对路径