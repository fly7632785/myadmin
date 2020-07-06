var str = 'yiifaa',
  str1 = new String('yiifaa'),
  str2 = String('yiifaa')
console.log('str:', typeof str) //string
console.log('str1:', typeof str1)//object
console.log('str2:', typeof str2)//string

//  new String是对象 不是String的基本类型
console.log('str1 === str', str1 === str)
console.log('str === str2', str === str2)
console.log('str1 === str2', str1 === str2)



const compose = (...fns) => {
  return (...args) => {
    let res = args
    for (let i = fns.length - 1; i > -1; i--) {
      console.log('fns:', typeof fns)
      console.log('fns[]:', typeof fns[i])
      res = fns[i](res)
    }
    return res
  }
}

//f是一个函数
function f(res) {
  return res + 1
}
console.log('f', typeof f)

function f1(res) {
  return res * 2
}

//func 是函数执行对象 可以执行参数的 语句（参数必须是字符串）
var func = new Function("console.log('我是动态创建的函数');console.log(1);");
func();    // 会把Function() 中最后一个参数当做函数体执行。


var a = new function () {
  return new String("aaa");	//返回String类 并 new出来
  //return new Array(1,2);	//返回数组(也是类)
};
console.log(a); // String {0: "a", 1: "a", 2: "a", length: 3} 就是一个 string实例 所以 打印a就是打印这个String的值
var b = new function () {
  return "b"; //基础类型不是类
};
console.log(b);//{} 因为返回的是一个基础类型 不是一个类 所以返回是一个没有任何实现的类的实例 就是一个空对象{}


//ff是一个对象（实则是定义一个类 并 new） 不是一个函数
const ff = new function (res) {
  return res
}
//在函数体中创建一个对象，声明其属性再返回  等价于下面
/*
function myClass() {
            var obj =
            {
                'id':2,
                'name':'myclass'
            };
            return obj;
        }
 */








//！！！报错 ff is not a function. (In 'ff(new String('我是类'))', 'ff' is an instance of Object
// console.log('ff',  ff(new String('我是类')))
// console.log('ff',  ff)  返回一个object

const ff1 = new function (res) {
  return res * 2
}

//fff是一个函数
const fff = (res) => {
  return res + 1
}
console.log('fff', typeof fff)
const fff1 = (res) => {
  return res * 2
}

//ff是函数
const ffff = function (res) {
  return res + 1
}
console.log('ffff', typeof ffff)
const ffff1 = function (res) {
  return res * 2
}

var dd = compose(fff, fff1)
console.log('dd', dd(2))

var aa = compose(f, f1)
console.log('aa', aa(2))
// var bb = compose(ff, ff1)
// console.log('bb', bb(2))
var cc = compose(function (res) {
  return res + 1
}, function (res) {
  return res * 2
})
console.log('cc', cc(2))
var fc = compose(ffff, ffff1)
console.log('ff', fc(2))
