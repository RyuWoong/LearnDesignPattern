// Wrapper , Decorator 패턴
// 객체들을 새로운 행동들을 포함한 특수 래퍼 객체들 내에 넣어서 위 행동들을 해당 객체들에 연결시키는 구조적 디자인 패턴

class Coffee {
  cost() {
    return 1000;
  }
  getDescription() {
    return "기본 커피";
  }
}

// 우유 데코레이터 클래스예요.
class MilkDecorator {
  constructor(private coffee: Coffee) {}

  cost() {
    return this.coffee.cost() + 500; // 우유 추가 비용
  }

  getDescription() {
    return this.coffee.getDescription() + ", 우유";
  }
}

// 시럽 데코레이터 클래스예요.
class SyrupDecorator {
  constructor(private coffee: Coffee) {}

  cost() {
    return this.coffee.cost() + 700; // 시럽 추가 비용
  }

  getDescription() {
    return this.coffee.getDescription() + ", 시럽";
  }
}

export default function main() {
  // 기본 커피를 주문해 볼까요?
  let myCoffee = new Coffee();
  console.log(`${myCoffee.getDescription()}의 가격: ${myCoffee.cost()}원`); // 기본 커피의 가격: 1000원

  console.log("\n--- 데코레이터 추가 후 ---");

  // 우유를 추가한 커피를 만들어봐요.
  myCoffee = new MilkDecorator(myCoffee);
  console.log(`${myCoffee.getDescription()}의 가격: ${myCoffee.cost()}원`); // 기본 커피, 우유의 가격: 1500원

  // 시럽도 추가해 볼까요? (우유 추가된 커피에 시럽 추가)
  myCoffee = new SyrupDecorator(myCoffee);
  console.log(`${myCoffee.getDescription()}의 가격: ${myCoffee.cost()}원`); // 기본 커피, 우유, 시럽의 가격: 2200원
}
