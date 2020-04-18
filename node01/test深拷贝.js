const _ = require("lodash")

var obj = {
    a:{
        b:100,
        fun:function(){
            console.log("fun")
        }
    }
}
//深拷贝
var obj2 = _.cloneDeep(obj);
obj.a.b=2000;
console.log(obj,obj2)

obj2.a.fun()

var arr = [1,2,'',null,0,33,"aa"];
var temArr = _.compact(arr);
console.log(temArr)
