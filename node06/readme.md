### mongodb 数据库
    mongod --dbpath 路径
    mongo
    help
    exit
    cls 清屏
    show dbs;
    use demo2;
    db 显示当前数据库的名字

    增删查改 
    db.集合的名字.insert({key:value...})
    db.stu.insert({"xm":"zs","age":15})
    show collections;显示当前数据库的所有集合

    db.集合的名字.find) 显示当前集合的文档
    db.stu.find() 显示所有文档
    for(var i = 0;i<5;i++){
        ... db.stu.save({"xm":"stu"+i,"age":20+i})
    }
    db.stu.find()
    排序
    db.集合的名字.find().sort({key:-1}) -1降序 1 升序
    db.stu.find().sort({age:1})
    db.集合的名字.find().count() 统计查询结果的文档数量

    查询条件 db.stu.find({"age":{$gt:20}}) gt表示大于20
            db.stu.find({"age":{$lt:20}}) lt表示小于20
            db.集合的名字.find({key:{$gt:value,$lt:value1}}) 多个键值对是并且的关系
            db.stu.find({$or:})
            db.stu.find({$or:[{age:16},{age:22}]}) 要写两个键值对
            $gt > $gte >= &lt < &lte <=>
            db.集合的名字.find({$or:{key:value,key:value...}}) 多个键值对是是或者的关系

            删除
            db.集合的名字.remove({key:value...})条件
            db.stu.remove({age:{$gt:22}})

            修改
            db.集合的名字.update()
            db.stu.update({age:22},{$set:{age:18}})
            db.stu.update({age:22},{$set:{age:30}}) 22这条记录没找到，插入了30
            db.stu.update({age:{$gt:1}},{$inc:{age:1}},true,true)
            db.集合的名字.update({条件},{$set:{key:value}},不存在是否新增,是否修改多个文档)
            db.集合的名字.update({条件},{$条件:})

            分页
            db.集合的名字.find)().limit(每页的文档个数).skip(略过的文档个数 (page-1)*pageSize)

            db.集合的名字.findOne() 显示第一个文档
            db.stu.find().limit(3).skip()         

### node 如何操作 mongodb
        mongoose 
        


