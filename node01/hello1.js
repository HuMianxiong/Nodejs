console.log("hello world");

console.log("abc".repeat(3));

console.log("5".padStart(2,"0"))//不够两位加前导0
//过滤形成新数组（大于3）
console.log([1,2,3,4,5].filter((item)=>{
    return item>3
}
    
))
//对每个元素做映射
//对每一项映射得到新数组
let temArr = [1,2,3,4,5].map((item)=>{
    return item*2
})
console.log(temArr)