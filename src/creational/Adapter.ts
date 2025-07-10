// 호환되지 않는 인터페이스를 가진 객체들이 협업할 수 있도록 하는 구조적 디자인패턴.

// 둥근 구멍
class RoundHole {
  private radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  getRadius() {
    return this.radius;
  }

  fits(peg: RoundPeg) {
    return this.getRadius() >= peg.getRadius();
  }
}

// 둥근 못
class RoundPeg {
  private radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  getRadius() {
    return this.radius;
  }
}

// 호환 안되는 정사각형 못
class SquarePeg {
  private width: number;

  constructor(width: number) {
    this.width = width;
  }

  getWidth() {
    return this.width;
  }
}

// 어댑터 클래스를 사용하면 정사각형 못을 둥근 구멍에 맞출 수 있습니다. 어댑터
// 객체들은 RoundPeg(둥근 못) 클래스를 확장해 둥근 못들처럼 작동하게 해줍니다.
class SquarePegAdapter extends RoundPeg {
  private peg: SquarePeg;

  constructor(peg: SquarePeg) {
    super(peg.getWidth());
    this.peg = peg;
  }

  getRadius() {
    return (this.peg.getWidth() * Math.sqrt(2)) / 2;
  }
}

export default function main() {
  const hole = new RoundHole(5);

  const rpeg = new RoundPeg(5);
  const peg = new SquarePegAdapter(new SquarePeg(3));
  const peg2 = new SquarePegAdapter(new SquarePeg(10));
  console.log(hole.fits(rpeg));
  console.log(hole.fits(peg));
  console.log(hole.fits(peg2));
}
