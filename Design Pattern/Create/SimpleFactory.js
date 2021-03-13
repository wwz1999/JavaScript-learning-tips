//!简单工厂模式
//1.0
//根据传入的参数，返回对应的东西
//即只要知道该工厂函数，以及需要的参数，不需要知道底层实现
//eg:
class BasketBall {
  constructor() {
    this.name = "BasketBall";
  }
}
class FootBall {
  constructor() {
    this.name = "FootBall";
  }
}
class TennisBall {
  constructor() {
    this.name = "TennisBall";
  }
}

const ballFactory = (ballType) => {
  switch (ballType) {
    case "BasketBall": {
      return new BasketBall();
    }
    case "FootBall": {
      return new FootBall();
    }
    case "TennisBall": {
      return new TennisBall();
    }
  }
};

const b = ballFactory("BasketBall");
console.log(b.name);

const f = ballFactory("FootBall");
console.log(f.name);

const t = ballFactory("TennisBall");
console.log(t.name);
//2.0
//提取公共部分，根据差异分别处理
const alertFactory = (alertLevel, content) => {
  const o = {
    content: content,
  };
  o.show = function () {
    console.log(`${this.level}:${this.content}`);
  };

  if (alertLevel === "log") {
    o.level = "log";
  }
  if (alertLevel === "warning") {
    o.level = "warning";
  }
  if (alertLevel === "error") {
    o.level = "error";
  }

  return o;
};
//test
const log = alertFactory("log", "print a log");
log.show();
