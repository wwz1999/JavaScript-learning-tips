# this

## 核心

任何方法的调用，都可以看作是fn.call(undefined,params)的语法糖

```javascript
function hello(thing) {
  console.log(this + " says hello " + thing);
}
// this:
hello("world")

// desugars to:
hello.call(window, "world");
```

直接调用方法，this指向window/undefined

对象调用方法，this指向该对象

