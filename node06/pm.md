### mongdb的命令
db.集合的名字.find().limit(n).skip((page-1)*pageSize)
db.集合的名字.find({key:{$gt:value,$lt:value}}) 并且的关系
db.集合的名字.find($or:[{key:value},{key:value}]) 或者的关系

### mongoose
    var Model = mongoose.model("集合的名字",Schema,[集合改后的名字])
    new Model({key:value}).save().then(callback)
    Model.remove
    Model.update
    Model.find
