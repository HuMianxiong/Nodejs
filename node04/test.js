
// function fun(){
//     setTimeout(()=>{
//         return 5;
//     },2000)
// }
// console.log(fun())//undefined 返回默认有个return 不会等异步执行完

//方法一：通过callback传递异步返回的值
// function fun(callback){
//     setTimeout(()=>{
//         callback(5)
//     },2000)
// }
// fun((data)=>{
//     console.log(data)//5
// })

//通过Promise 来处理异步
function fun(){ 
    return new Promise((resolve,reject)=>{ //Promise里面带着一个回调函数，第一个参数resolve是成功时候执行的回调，第二个参数reject是失败的时候执行的回调
        setTimeout(()=>{
            var c=6
            resolve(c) //两秒钟后调用resolve
        },2000)
    })
}
// fun().then((data)=>{//.then()调用成功的回调函数resolve
//     console.log(data)
// }).catch(()=>{
//     //处理错误
// })
    
//通过async await 处理异步
async function test(){//async异步 表示函数要处理异步的东西  async和await成对存在 
    var data = await fun()//await后面跟的东西必须返回Promise,这样我就能拿到异步的返回值
    console.log(data)
}
test();

