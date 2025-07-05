/**
 * 팩토리 메서드는 구상 클래스들로 부터 객체들을 생성하는 메서드.
 * 구상 클래스는 객체 생성 중에 사용되지만 팩토리 메서드들의 반환 유형은 일반적으로 추상 클래스 또는 인터페이스로 선언돼요.
 */

/**
 * Maker 클래스는 Product 클래스를 반환하는 팩토리 메서드를 선언합니다.
 * Maker 자식클래스는 이 메서드의 구현을 제공합니다.
 */
abstract class Maker {
  // 또는 기본으로 제공된 팩토리 메서드를 제공할 수 있습니다.
  public abstract make(): Product;

  /**
   * 이 클래스의 주요 책임은 제품을 만드는 것이 아닙니다.
   * 일반적으로 팩토리 메서드에 의해 반환되는 Product 객체에 의존하는 몇 가지 핵심 비즈니스 로직을 포함합니다.
   * 서브 클래스는 팩토리 메서드를 재정의하고 다른 유형의 제품을 반환함으로써 해당 비즈니스 로직을 간접적으로 변경할 수 있습니다.
   */
  public action(): string {
    const product = this.make();
    return `이 메이커는 ${product.name()}을(를) 만들어요`;
  }
}

/**
 * Maker는 팩토리 메서드를 재정의하여 제품 유형을 변경합니다.
 */
class DrinkMaker extends Maker {
  /**
   * 메서드에서 실제로 구체적인 프로덕트가 반환됩니다.
   * 하지만 메서드 시그니처는 여전히 추상 프로덕트 유형을 사용합니다.
   * 이렇게 하면 크리에이터가 구체적인 제품 클래스로부터 독립성을 유지할 수 있습니다.(?)
   */
  public make(): Product {
    return new Water();
  }
}

class IceMaker extends Maker {
  public make(): Product {
    return new Ice();
  }
}

/**
 * Product 인터페이스는 모든 구체적인 제품들이 구현해야 하는 인터페이스를 선언합니다.
 */
interface Product {
  name(): string;
}

class Water implements Product {
  public name(): string {
    return "Water";
  }
}

class Ice implements Product {
  public name(): string {
    return "Ice";
  }
}

function clientCode(maker: Maker) {
  console.log(maker.action());
}

export default function main() {
  clientCode(new DrinkMaker());
  console.log("");
  clientCode(new IceMaker());
}
