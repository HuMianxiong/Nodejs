var express = require('express');
var router = express.Router();
var mongoose = require('../util/conn')
const crypto = require('crypto')
var jsonwebtoken = require('jsonwebtoken')

// router.use(function(req,res,next){//拦截所有的请求
//   //登陆和注册的请求不拦截，因为注册之后才能登陆，登陆之后才会产生令牌
//   if(req.url !== '/users/login' && req.url!== '/users/reg'){
//     //进行令牌的验证
//     console.log(req.url+'被拦截了...')
//     jsonwebtoken.verify(req.cookies.token,'haha',(err,code)=>{
//       if(!err){//通过了令牌验证
//         console.log('通过了令牌验证',req.cookies.token)
//         next()
//       }
//       else{//没有通过
//         res.json({
//           code:200,
//           data:{
//             valid:false,//valid是false表示验证没有通过
//             message:'error'//是为了方便客户端判断当前接口是否验证通过了
//           }
//         })
//       }
//     })

//   }
  
//   else{
//     next() //注册和登陆可以正常调用接口
//   }

// })
var User = mongoose.model("users",{"username":String,"password":String},"users")
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//登陆的接口 /users/login
router.post('/login',(req,res)=>{
  let {username,password} = req.body;//拿到用户post提交的数据

  //用户提交过来的密码要进行加密才能和数据库里的加密后的密码进行核对
  password = crypto.createHmac('sha256', password)
  .update('I love cupcakes')
  .digest('hex');

  //查找数据库集合里是否有username password 
  User.find({username,password}).then((result)=>{
    if(result.length>0){
      // console.log('111',username,password)
      req.session.str = 'haha'
      req.session.username = username //把用户名存储在session里
      //产生一个令牌，发送到客户端cookie存储起来
      var token = jsonwebtoken.sign(
        {username:username,time:Date.now()},req.session.str,{expiresIn:100000}//单位为秒
      )
      res.cookie('token',token)//服务端向客户端写入cookie
      res.json({
        code:200,
        data:{
          login:true //登陆成功
        }
      })
    }
    else{
      res.json({
        code:200,
        data:{
          login:false //登陆失败
        }
      })
    }
  })
})

//注册的接口
router.post('/reg',(req,res)=>{
  //1)拿到用户名和密码
  let {username,password} = req.body
  //1)用户名重名问题
  //2)密码加密的问题
  password = crypto.createHmac('sha256', password)
                     .update('I love cupcakes')
                     .digest('hex');

  //判断用户提交的用户名是否再数据库里存在
  User.find({username:username}).then((result)=>{
    //如果存在{result数组的长度大于0}，就不向users集合写入数据
    if(result.length>0){
      res.json({
        code:200,
        data:{
          reg:false //表示注册失败，因为用户名已经存在了
        }
      })
    }
    else{
      //不存在，向数据库里插入用户名和密码
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

//退出接口 清除 session cookie
router.post('/quit',(req,res)=>{
  req.session.username = null;//清除session
  res.cookie('token',"")
  res.json({
    code:200,
    data:{
      quit:true
    }
  })
})

//返回用户名的接口 /users/user
router.post('/user',(req,res)=>{
  res.json({
    code:200,
    data:{
      username:req.session.username?req.session.username:""
    }
  })
})
module.exports = router;
