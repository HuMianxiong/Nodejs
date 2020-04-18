$.post('/users/user').then((res)=>{
    //如果res.data.message有信息不为空，那么久说明验证没有通过
    if(res.code === 200 && res.data.message){
        console.log('没通过')
        location.href = '/login.html'
    }
    else{
        $("body").prepend(`<div>你好${res.data.username}<button id='quit'>退出</button></div>`)
    }
})

$(function(){
    $('body').on('click','#quit',function(){
        $.post('/users/quit').then((res)=>{
            if(res.code === 200 && res.data.quit){
                location.href= "/login.html"
            }
        })
    })
})