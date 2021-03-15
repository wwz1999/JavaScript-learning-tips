function Promise(excutor) {
  this.callbacks = [];
  const resolve = (value) => {
    setTimeout(() => {
      this.data = value;
      this.callbacks.forEach((fn) => {
        fn(value);
      });
    });
  };
  excutor(resolve);
}
Promise.prototype.then = function (onResolved) {
  return new Promise((resolve) => {
    this.callbacks.push(() => {
      const res = onResolved(this.data);
      if (res instanceof Promise) {
        res.then(resolve);
      } else {
        resolve(res);
      }
    });
  });
};

//test
const p = new Promise((r) => {
  setTimeout(() => {
    r("success");
  }, 2000);
})
  .then((value) => {
    console.log(value);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("success too");
      }, 2000);
    });
  })
  .then((value) => {
    console.log(value);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("success too");
      }, 2000);
    });
  })
  .then((value) => {
    console.log(value);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("success too");
      }, 2000);
    });
  })
  .then((value) => {
    console.log(value);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("success too");
      }, 2000);
    });
  })
  .then(console.log);
