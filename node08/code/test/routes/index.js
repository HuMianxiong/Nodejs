var express = require('express');
var router = express.Router();
var mongoose = require("../util/conn")
var jsonwebtoken = require("jsonwebtoken")



router.use(function(req,res,next){//拦截所有的请求
  //登录和注册的请求不拦截，因为注册之后才能登陆，登录之后会产生令牌
  if(req.url !== '/users/reg' && req.url !=='/users/login'){
    //进行令牌的验证
    console.log(req.url+"被拦截了...")
    jsonwebtoken.verify(req.cookies.token,"haha",(err,code)=>{
      if(!err){
        //通过了令牌验证
        console.log("通过了令牌验证",req.cookies.token)
        next()
      }
      else{
        //没有通过
        res.json({
          code:200,
          data:{
            valid:false,//valid 是false表示验证没有通过
            message:"error" //是为了方便客户端判断当前接口是否验证通过了
          }
        })
      }
    })
  }
  else{
    next() //注册和登录可以正常调用接口
  }
})
//建立一个学生的模型，有了这个模型就可以对学生进行增删改查
var Model = mongoose.model('stu',{"name":String,"age":Number},"stu")
//向stu这个集合里插入一个文档
// new Model({"name":"ls1","age":30}).save().then(()=>{
//   console.log("insert ok")
// })


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//把stu集合里的数据展示给客户，提供一个列表的接口 /list
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
//对stu集合里的数据进行分页展示
router.get("/pagelist",(req,res)=>{
  let {page,pageSize} = req.query;//获取前端页面传来的page，pageSize
  Model.find().then((resAll)=>{//resAll所有文档的个数
    Model.find().limit(Number(pageSize)).skip((page-1)*pageSize).then((result)=>{
      res.json({//result 当前页面的文档
        code:200,
        data:{
          list:result,
          count:Math.ceil(resAll.length/pageSize)
        }
      })
    })
  })
})
//remove接口，删除stu集合中的文档
router.get("/remove",(req,res)=>{
  let {id} = req.query
  Model.remove({_id:id}).then(()=>{
    res.json({
      code:200,
      data:{remove:true}
    })
  })
})
//modify接口，获取修改的文档数据
router.get("/modify",(req,res)=>{
  var {id} = req.query
  //根据id查找文档
  Model.find({_id:id}).then((result)=>{
    res.json({
      code:200,
      data:{
        id:result[0]._id,
        name:result[0].name,
        age:result[0].age
      }
    })
  })
})
//modifyok 提交数据，修改文档
router.post("/modifyok",(req,res)=>{
  let {id,name,age} = req.body;//用户post提交的三个值{id,name,age}
  Model.update({_id:id},{$set:{name,age}}).then(()=>{
    res.json({
      code:200,
      data:{
        finish:true
      }
    })
  })
})
//add接口 向stu集合里添加文档
router.post("/add",(req,res)=>{
  //把用户post提交的名字和年龄取过来
  let {name,age} = req.body;
  //向stu集合里写数据
  new Model({name,age}).save().then(()=>{
    res.json({
      code:200,
      data:{add:true}
    })
  })
})
module.exports = router;
