var express = require('express');
var router = express.Router();
var mongoose = require('../util/conn')
var crypto = require("crypto")
var User = mongoose.model("user",{"username":String,"password":String},"user")
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//注册的接口 url /users/reg 
//method post 
//params:username  String password String
//response:{code:200,data:{reg:boolean}}

//登陆的接口 /users/login
router.post("/login",(req,res)=>{
  let {username,password} = req.body;//拿到用户post提交的数据
  //用户提交过来的密码要进行加密才能和数据库里的加密后的密码进行核对
  password = crypto.createHmac('sha256',password).update('I love cupcakes').digest('hex');
})
router.post('/reg',(req,res)=>{
  let {username,password} = req.body;//拿到用户post提交的数据
//1)用户名重名
//2）密码加密的问题

  password = crypto.createHmac('sha256',password).update('I love cupcakes').digest('hex');

  User.find({username,password}).then((result)=>{
    if(result.length>0){
      res.json({
        code:200,
        data:{
          login:true
        }
      })
    }
    else{
      res.json({
        code:200,
        data:{
          login:false
        }
      })
    }
  })

  //判断用户提交的用户名是否在数据库里存在
  //2) 判断用户名在数据库是否存在
  User.find({username:username}).then((result)=>{
    if(result.length>0){
      res.json({
        code:200,
        data:{
          reg:false //注册失败
        }
      })
    }
    else{
      //3） 向数据库里插入用户名和密码
      new User({username:username,password:password}).save().then(()=>{
        res.json({
          code:200,
          data:{
            reg:true //注册成功
          }
        })
      })
    }
  })

  //如果存在，(result 数组的长度大于0)就不向users集合写入数据
  //如果不存在，(result 数组的长度等于0）向users集合写入数据
  new User({username,password}).save().then(()=>{
    res.json({
      code:200,
      data:{
        reg:true //表示注册成功
      }
    })
  })
})
module.exports = router;
