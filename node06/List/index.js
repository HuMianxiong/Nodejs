var express = require('express');
var router = express.Router();
var mongoose = require("../util/conn");//两个作用

//1)拿到mongoose
//2）执行 util/conn.js 代码
/*GET home page.*/
//建立模型 有了这个模型就可以对数据库集合进行增删改查了
const Student = mongoose.model('stu',{name:String,age:number},'stu');
//