//抽象工厂模式
//通过对类的工厂抽象，使其业务用于对产品类簇的创建，而不负责创建某一类产品的实例
//!创建抽象类
//js里没有抽象类，但可以模拟
class Car {
  getBrand() {
    throw new Error("抽象方法不能调用");
  }
  getPrize() {
    throw new Error("抽象方法不能调用");
  }
}
//抽象类只能声明，不能使用，主要是用于在继承中提供规范
// const car = new Car();
// car.getBrand();

class Bugatti extends Car {
  constructor() {
    super();
    this.brand = "Bugatti";
    this.prize = 1000;
  }
  //方法在这里实现，才能使用
  getBrand() {
    console.log(this.brand);
  }
}
const bugatti = new Bugatti();
bugatti.getBrand();
