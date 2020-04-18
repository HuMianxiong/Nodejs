const http = require("http")
const fs = require("fs");
const cheerio = require("cheerio")
http.get("http://news.baidu.com",(res)=>{//res是一个流对象
    // console.log(res);
    var body = "";
    res.on("data",(thunk)=>{//监听 data事件，把每一块数据写入body里面
        body+=thunk;
    })
    res.on("end",()=>{//end 事件，表示写入完成
        console.log(body);
        res.setEncoding("utf-8")
        // fs.writeFileSync("./news.html",body,"utf-8");
        const $ = cheerio.load(body)//把字符串转为jq对象
        //获取焦点新闻列表元素，并把内容写入到文本文件里
        fs.writeFileSync("./focusnews.txt","","utf-8");
        $(".focuslistnews a").each((index,item)=>{
            fs.appendFileSync("./focusnews.txt",$(item).text()+"\r\n","utf-8");
            // console.log($(item).text())

        })
        // var ws = fs.createWriteStream("./new2.html");
        // ws.write(body,"utf-8")
    })
})