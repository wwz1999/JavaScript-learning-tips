//构造函数
function MyPromise(excutor) {
  //promise当前的状态
  this.status = "pending";
  //promise的值
  this.data = undefined;
  //resolve时的回调函数集合
  this.onResolvedCallback = [];
  //reject时的回调函数集合
  this.onRejectedCallback = [];

  //此处定义resolve和reject
  //resolve接受一个参数value
  const resolve = (value) => {
    if (this.status === "pending") {
      //状态改变为resolved
      this.status = "resolved";
      this.data = value;
      //对resolve回调函数集依次执行
      for (let i = 0; i < this.onResolvedCallback.length; i++) {
        this.onResolvedCallback[i](value);
      }
    }
  };

  //reject接受一个参数reason
  const reject = (reason) => {
    if (this.status === "pending") {
      this.status = "rejected";
      this.data = reason;
      for (let i = 0; i < this.onRejectedCallback.length; i++) {
        this.onRejectedCallback[i](reason);
      }
    }
  };

  try {
    //执行excutor
    excutor(resolve, reject);
  } catch (e) {
    //如果出错则reject
    reject(e);
  }
}

//then方法
MyPromise.prototype.then = function (onResolved, onRejected) {
  //如果两个参数不是函数，则忽略
  onResolved =
    typeof onResolved === "function"
      ? onResolved
      : function (value) {
          return value;
        };
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : function (reason) {
          return reason;
        };
  //promise共3种状态，分为三种情况处理，并在每一种情况中都返回一个新的promise
  if (this.status === "resolved") {
    //如果promise1的状态确定为resolved，则调用onResolved
    //因为可能出现throw，将其包裹在catch中
    return new MyPromise((resolve, reject) => {
      try {
        const x = onResolved(this.data);
        //如果返回的值是一个promise，则直接取其结果作为promise2的结果
        if (x instanceof MyPromise) {
          x.then(resolve, reject);
        }
        //否则将返回值作为promise2的结果
        resolve(x);
      } catch (e) {
        reject(e);
      }
    });
  }
  if (this.status === "rejected") {
    return new MyPromise((resolve, reject) => {
      const x = onRejected(this.data);
      if (x instanceof MyPromise) {
        x.then(resolve, reject);
      }
    });
  }
  //将回调函数加入方法队列
  if (this.status === "pending") {
    return new MyPromise((resolve, reject) => {
      this.onResolvedCallback.push((value) => {
        try {
          const x = onResolved(this.data);
          if (x instanceof MyPromise) {
            x.then(resolve, reject);
          }
        } catch (e) {
          reject(e);
        }
      });
      this.onRejectedCallback.push((reason) => {
        try {
          const x = onRejected(this.data);
          if (x instanceof MyPromise) {
            x.then(resolve, reject);
          }
        } catch (e) {
          reject(e);
        }
      });
    });
  }
};

//catch方法
MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

//test======================================================
const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 5000);
});
p.then((value) => {
  console.log(value);
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve("success too");
    }, 4000);
  });
}).then((value) => {
  console.log(value);
});
