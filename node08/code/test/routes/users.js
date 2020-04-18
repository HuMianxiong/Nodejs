var express = require('express');
var router = express.Router();
var mongoose = require('../util/conn')
var crypto = require("crypto")
var jsonwebtoken = require("jsonwebtoken")

var User =  mongoose.model("users",{"username":String,"password":String},"users")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//登录的接口 /users/login
router.post("/login",(req,res)=>{
  let {username,password} = req.body;//拿到用户post提交的数据
  //用户提交过来的密码要进行加密才能和数据库里的加密后的密码进行核对
  password = crypto.createHmac("sha256",password).update('I love cupcakes').digest('hex');
  //查找数据库users集合里是否有 username password
  User.find({username,password}).then((result)=>{
    if(result.length>0){
      console.log('11')
      req.session.username = username;//把用户名存在session里
      //产生一个令牌，发送到客户端cookie存储起来
      var token = jsonwebtoken.sign({
        username:username,time:Date.now()
      },"haha",{expiresIn:100000}) //有效期是10s
      res.cookie("token",token);//服务端向客户端写入cookie
      res.json({
        code:200,
        data:{
          login:true//登录成功
        }
      })
    }
    else{
      res.json({
        code:200,
        data:{
          login:false//登陆失败
        }
      })
    }
  })
})

//退出接口 清除session，cookie
router.post("/quit",(req,res)=>{
  req.session.username = null;//清除session
  if(req.cookies.token){
    //清除cookie里的token
    res.cookie("token","");
  }
  res.json({
    code:200,
    data:{
      quit:true
    }
  })
})
//返回用户名的接口 /users/user
router.post("/user",(req,res)=>{
  res.json({
    code:200,
    data:{
      username:req.session.username?req.session.username:""
    }
  })
})
//注册的接口
router.post('/reg',(req,res)=>{
  let {username,password} = req.body;//拿到用户post提交的数据
  //1）用户名重名
  //2）密码加密的问题
  password = crypto.createHmac('sha256', password)
  .update('I love cupcakes')
  .digest('hex');
  //判断用户提交的用户名是否在数据库里存在
  User.find({username}).then((result)=>{
    //如果存在，就不向users集合里写入数据
    if(result.length>0){
      res.json({
        code:200,
        data:{
          reg:false //表示注册失败，因为用户名已经存在了
        }
      })
    }
    else{
      //如果不存在，写入数据
      //向数据库里插入用户名和密码
      new User({username,password}).save().then(()=>{
        res.json({
          code:200,
          data:{
            reg:true //表示注册成功
          }
        })
      })
    }
  })
})
module.exports = router;
