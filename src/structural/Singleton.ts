// 싱글턴은 클래스에 인스턴스가 하나만 있도록 하면서 이 인스턴스에 대한 전역 접근​(액세스) 지점을 제공하는 생성 디자인 패턴입니다.

class Singleton {
  static #instance: Singleton;
  value: number = 0;

  constructor() {
    if (Singleton.#instance) {
      return Singleton.#instance;
    }

    this.value = Math.random();

    Singleton.#instance = this;
  }
}

export default function main() {
  const config1 = new Singleton();
  const config2 = new Singleton();

  console.log(config1 === config2);
  console.log(config1.value);
  console.log(config2.value);
}
