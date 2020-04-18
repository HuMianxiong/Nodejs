var express = require('express');
var router = express.Router();
var mongoose = require("../util/conn")
//建立一个学生的模型 有了这个模型，就可以对学生进行增删改查
var Model = mongoose.model("stu",{"name":String,"age":Number},"stu")
//向stu这个集合里插入一个文档
new Model({"name":"zs","age":20}).save().then(()=>{
  console.log("insert ok")
})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//把stu集合里的数据展示给客户，提供一个列表的接口
router.get("/list",(req,res)=>{
  Model.find().then((result)=>{
    res.json({
      code:200,
      data:{
        list:result
      }
    })
  })
})

//test 接口是测试用户get提交的数据的接收
router.get('/test',(req,res)=>{
  let {a,b} = req.query;
  console.log(a,b)
})

router.post('/testpost',(req,res)=>{

})  
module.exports = router;
