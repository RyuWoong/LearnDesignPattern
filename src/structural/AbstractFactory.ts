// A와B를 만들 수 있는 인터페이스.
interface AbstractFactory {
  createChair(): AbstractChair;
  createTable(): AbstractTable;
}

interface AbstractChair {
  name: string;
  sit(): void;
}

interface AbstractTable {
  name: string;
}

class MordernFactory implements AbstractFactory {
  createChair(): AbstractChair {
    return new ModernChair();
  }
  createTable(): AbstractTable {
    return new ModernTable();
  }
}

class VintageFactory implements AbstractFactory {
  createChair(): AbstractChair {
    return new VintageChair();
  }
  createTable(): AbstractTable {
    return new VintageTable();
  }
}

class ModernChair implements AbstractChair {
  name: string = "Modern Chair";
  public sit(): void {
    console.log("Sitting on a modern chair");
  }
}

class VintageChair implements AbstractChair {
  name: string = "Vintage Chair";
  public sit(): void {
    console.log("Sitting on a vintage chair");
  }
}

class ModernTable implements AbstractTable {
  name: string = "Modern Table";
}

class VintageTable implements AbstractTable {
  name: string = "Vintage Table";
}

function clientCode(factory: AbstractFactory) {
  const chair = factory.createChair();
  const table = factory.createTable();

  console.log(chair.name);
  console.log(table.name);
}

const modernFactory = new MordernFactory();
clientCode(modernFactory);

const vintageFactory = new VintageFactory();
clientCode(vintageFactory);
