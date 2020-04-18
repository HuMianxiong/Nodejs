// const mongoose = require("mongoose");
// mongoose.connect('mongodb://localhost/test');
//建立模型 在数据库test里就会有一个cats集合

// const Cat = mongoose.model('Cat',{name:String},'cat');

// const kitty = new Cat({name:'Zildjian'});
// kitty.save().then(()=>console.log('aaa born'))

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/test');

//建立模型 在数据库test里就会有一个cats集合

const Cat = mongoose.model('Cat',{name:String},'cat');

//插入文档
// const kitty = new Cat({name:'fsfs'});
// kitty.save().then(()=>console.log('bba born'));

//修改文档
Cat.update({"name":'ccc'},{$set:{"name":"ccc1"}}).then(()=>{
    console.log("修改成功")
})

//删除文档
Cat.remove({"name":"bba"}).then(()=>{
    console.log('删除成功')
})

//查找文档
// Cat.find({"name":'aaa'}).then((res)=>{
//     console.log(res)
// })

Cat.find().then((res)=>{
    console.log(res instanceof a)
    var arr = res.map((item)=>{
        return item.name
    })
    console.log(arr)
})
