//数据的响应式 监听一个数据的变化

let obj = {
    _a:2 //表示a是一个私有属性，外界不能访问
}
// console.log(obj._a)//2
Object.defineProperty(obj,"a",{//通过这种方式给对象增加一个属性
    // value:333
    get(){//访问到a属性就会执行 get方法
        console.log('调用了get方法');
        return this._a;
    },
    set(v){ //只要给a赋值，就会执行这个方法 可以检测数据变化了
        this._a = v;
    }
})

// console.log(obj._a,obj.a)
obj.a = 888;
console.log(obj.a)
console.log(obj._a)