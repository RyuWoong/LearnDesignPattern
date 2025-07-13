// 복합체 패턴은 객체들을 트리 구조들로 구성한 후, 이러한 구조들과 개별 객체들처럼 작업할 수 있도록 하는 구조 패턴입니다.
// 복합체 패턴은 앱의 핵심 모델이 트리로 표현될 수 있을 때만 사용하세요.

interface Graphic {
  move(x: number, y: number): void;
  draw(): void;
}

class Dot implements Graphic {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  move(x: number, y: number): void {
    console.log(`Dot moved to ${x}, ${y}`);
  }

  draw(): void {
    console.log(`Dot drawn at ${this.x}, ${this.y}`);
  }
}

class Circle extends Dot {
  radius: number;

  constructor(x: number, y: number, radius: number) {
    super(x, y);
    this.radius = radius;
  }

  move(x: number, y: number): void {
    console.log(`Circle moved to ${x}, ${y}`);
  }

  draw(): void {
    console.log(
      `Circle drawn at ${this.x}, ${this.y} with radius ${this.radius}`
    );
  }
}

export default function main() {
  const dot = new Dot(1, 2);
  dot.move(3, 4);
  dot.draw();

  const circle = new Circle(5, 6, 7);
  circle.move(8, 9);
  circle.draw();
}
