//读取网页的内容，并把{变量}用json文件里的数据替换
const express = require("express")
const fs = require("fs")
const app = express()
//这种(以模块方式)方式可以直接使用 data对象
const data = require("./data.json") 
const http = require("http")
const cheerio = require("cheerio")
//请求 读取zy.html的内容并返回
app.get("/",(req,res)=>{
    //读取网页内容
    var content = fs.readFileSync("./public/zy.html","utf-8")
    content = content.replace("{name}",data.name);//替换网页当中的{name}   
    content = content.replace("{age}",data.age)//替换网页中的{age}
    res.send(content)//返回给客户端
})

// /news 显示百度焦点新闻的内容
app.get("/news",(req,res)=>{
    http.get("http://news.baidu.com",(response)=>{//response是一个流对象
        response.setEncoding("utf-8")
        var str = "";
        response.on("data",(thunk)=>{//监听data事件，把每一块数据写入body里面
            str+=thunk;
        })
        response.on("end",()=>{
            
            var $ = cheerio.load(str)//把字符串转为jq对象
            var list = ""//存储新闻列表的内容
            //获取焦点新闻列表元素，并把内容写入到文本文件里
            $(".focuslistnews a").each((index,item)=>{
                list+=$(item).text()+"<br />"
            })
            res.send(list);
        })
    })
})

// /news 显示百度焦点新闻的内容
app.get("/news2",(req,res)=>{
    http.get("http://news.baidu.com",(response)=>{//response是一个流对象
        response.setEncoding("utf-8")
        var str = "";
        response.on("data",(thunk)=>{//监听data事件，把每一块数据写入body里面
            str+=thunk;
        })
        response.on("end",()=>{
            
            var $ = cheerio.load(str)//把字符串转为jq对象
            var list = ""//存储新闻列表的内容
            //获取焦点新闻列表元素，并把内容写入到文本文件里
            $(".focuslistnews a").each((index,item)=>{
                list+=$(item).text()+"<br />"
            })
            res.send(list);
        })
    })
})
app.listen(2000,()=>{
    console.log("listen 2000...")
})