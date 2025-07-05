// 빌더 패턴을 사용하는 것은 제품에 매우 복잡하고 광범위한 설정이 필요한 경우에만
// 의미가 있습니다. 다음 두 제품은 공통 인터페이스는 없지만 관련되어 있습니다.

class Car {
  seats: number = 0;
  engine: string = "";
  tripComputer: boolean = false;
  gps: boolean = false;
}

class Manual {
  seats: number = 0;
  engine: string = "";
  tripComputer: boolean = false;
  gps: boolean = false;
}

// 빌더 인터페이스는 제품 객체들의 다른 부분들을 만드는 메서드들을 지정합니다.
interface Builder {
  reset(): void;
  setSeats(seats: number): void;
  setEngine(engine: string): void;
  setTripComputer(tripComputer: boolean): void;
  setGPS(gps: boolean): void;
}

class CarBuilder implements Builder {
  private car: Car;

  constructor() {
    this.car = new Car();
  }

  reset(): void {
    this.car = new Car();
  }

  setSeats(seats: number): void {
    this.car.seats = seats;
  }

  setEngine(engine: string): void {
    this.car.engine = engine;
  }

  setTripComputer(tripComputer: boolean): void {
    this.car.tripComputer = tripComputer;
  }

  setGPS(gps: boolean): void {
    this.car.gps = gps;
  }

  // 구상 빌더들은 결과들을 가져오기 위한 자체 메서드들을 제공해야 합니다.
  // 왜냐하면 다양한 유형의 빌더들은 모두 같은 인터페이스를 따르지 않는 완전히
  // 다른 제품들을 생성할 수 있기 때문입니다. 따라서 이러한 메서드는 빌더
  // 인터페이스에서 선언할 수 없습니다. 적어도 이는 정적 타입 언어에서는
  // 불가능합니다.
  //
  // 최종 결과를 클라이언트에 반환한 후 일반적으로 빌더 인스턴스는 다른 제품
  // 생산을 시작할 준비가 되어 있을 것이라고 예상됩니다. 이것이
  // `getProduct` 메서드의 본문 끝에서 reset 메서드를 호출하는 것이
  // 일반적인 관행인 이유입니다. 하지만 반드시 이렇게 해야 하는 것은
  // 아니라서, 빌더가 클라이언트 코드로부터 명시적으로 reset 호출을 받을
  // 때까지 이전 결과를 삭제하지 않고 기다리게 만들 수 있습니다.
  public getProduct(): Car {
    const product = this.car;
    this.reset();
    return product;
  }
}

class CarManualBuilder implements Builder {
  private manual: Manual;

  constructor() {
    this.manual = new Manual();
  }

  reset(): void {
    this.manual = new Manual();
  }

  setSeats(seats: number): void {
    this.manual.seats = seats;
  }

  setEngine(engine: string): void {
    this.manual.engine = engine;
  }

  setTripComputer(tripComputer: boolean): void {
    this.manual.tripComputer = tripComputer;
  }

  setGPS(gps: boolean): void {
    this.manual.gps = gps;
  }

  getProduct(): Manual {
    const product = this.manual;
    this.reset();
    return product;
  }
}

// 디렉터는 특정 순서로 생성 단계들을 실행하는 책임만 있습니다. 이것은 특정 순서나
// 설정에 따라 제품들을 생성할 때 유용합니다. 엄밀히 말하면, 클라이언트가 빌더들을
// 직접 제어할 수 있으므로 디렉터 클래스는 선택 사항입니다.
class Director {
  // 디렉터는 클라이언트 코드가 전달하는 모든 빌더 인스턴스와 함께 작동합니다.
  // 그러면 클라이언트 코드는 새로 조립된 제품의 최종 유형을 변경할 수
  // 있습니다. 디렉터는 같은 생성 단계들을 사용하여 여러 제품 변형들을 생성할
  // 수 있습니다.

  buildCar(builder: Builder) {
    builder.setSeats(2);
    builder.setEngine("V8");
    builder.setTripComputer(true);
    builder.setGPS(true);
  }

  buildManual(builder: Builder) {
    builder.setSeats(2);
    builder.setEngine("V8");
    builder.setTripComputer(true);
    builder.setGPS(true);
  }
}

export default function main() {
  const carBuilder = new CarBuilder();
  const director = new Director();
  director.buildCar(carBuilder);
  const car = carBuilder.getProduct();
  console.log(car);

  const carManualBuilder = new CarManualBuilder();
  director.buildManual(carManualBuilder);
  const manual = carManualBuilder.getProduct();
  console.log(manual);
}
