var express = require('express');
var router = express.Router();
var mongoose = require('../util/conn')
var jsonwebtoken = require('jsonwebtoken')
//建立一个学生模型，有了这个模型就可以对学生进行增删改查
var Model =mongoose.model('stu',{"name":String,"age":Number},"stu")

//向stu这个集合里插入一个文档
// new Model({"name":'a1',"age":1}).save().then(()=>{
//   console.log("insert ok")
// })

router.use(function(req,res,next){//拦截所有的请求
  //登陆和注册的请求不拦截，因为注册之后才能登陆，登陆之后才会产生令牌
  if(req.url !== '/users/login' && req.url!== '/users/reg'){
    //进行令牌的验证
    console.log(req.url+'被拦截了...')
    jsonwebtoken.verify(req.cookies.token,'haha',(err,code)=>{
      if(!err){//通过了令牌验证
        console.log('通过了令牌验证',req.cookies.token)
        next()
      }
      else{//没有通过
        res.json({
          code:200,
          data:{
            valid:false,//valid是false表示验证没有通过
            message:'error'//是为了方便客户端判断当前接口是否验证通过了
          }
        })
      }
    })

  }
  else{
    next() //注册和登陆可以正常调用接口
  }
  // if(req.url === '/users/login' || req.url ==='/user/reg'){
  //   console.log(req.url+'被拦截了..')
  // }
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//把stu集合里的数据展示给客户，提供一个列表的接口 /list
router.get('/list',(req,res)=>{
  Model.find().then((result)=>{
    res.json({
      code:200,
      data:{
        list:result
      }
    })
  })
})

//对stu集合的数据进行分页显示
router.get("/pagelist",(req,res)=>{
  let {page,pageSize} = req.query;
  Model.find().then((resAll)=>{
    Model.find().limit(Number(pageSize)).skip(Number(pageSize)*(page-1)).then((result)=>{
      res.json({
        code:200,
        data:{
          list:result,
          count:Math.ceil((resAll.length/pageSize))
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
router.get('/modify',(req,res)=>{
  var {id} = req.query
  Model.find({_id:id}).then((result)=>{
    res.json({
      code:200,
      data:{
        id:result[0].id,
        name:result[0].name,
        age:result[0].age
      }
    })
  })
})

//modify接口，提交数据，修改文档
router.post('/modifyok',(req,res)=>{
  let {id,name,age} = req.body
  Model.update({_id:id},{$set:{name,age}}).then((result)=>{
    res.json({
      code:200,
      data:{
        finish:true
      }
    })
  })
})

//add接口，向stu集合里添加文档
router.post('/add',(req,res)=>{
  let {name,age} = req.body
  //向stu集合里写入数据
  new Model({name,age}).save().then(()=>{
    res.json({
      code:200,
      data:{
        add:true
      }
    })
    
  })
})
module.exports = router;
