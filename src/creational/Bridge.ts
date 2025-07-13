// 브리지는 큰 클래스 또는 밀접하게 관련된 클래스들의 집합을 두 개의 개별 계층구조​(추상화 및 구현)​로 나눈 후 각각 독립적으로 개발할 수 있도록 하는 구조 디자인 패턴입니다.
//  유형들이 많아지면 많아질수록 코드는 점점 복잡해집니다.
// 이 문제는 모양과 색상의 두 가지 독립적인 차원에서 모양 클래스들을 확장하려고 하기 때문에 발생합니다. 이것은 클래스 상속과 관련된 매우 일반적인 문제입니다.
//브리지 패턴은 상속에서 객체 합성으로 전환하여 이 문제를 해결하려고 시도합니다.
// 이것이 의미하는 바는 차원 중 하나를 별도의 클래스 계층구조로 추출하여 원래 클래스들이 한 클래스 내에서 모든 상태와 행동들을 갖는 대신 새 계층구조의 객체를 참조하도록 한다는 것입니다.

// '추상화'는 두 클래스 계층구조의 '제어' 부분에 대한 인터페이스를 정의하며,
// 이것은 '구현' 계층구조의 객체에 대한 참조를 유지하고 모든 실제 작업을 이
// 객체에 위임합니다.

// 리모컨 -> 확장 리모컨
// 기기  -> TV, Radio
class RemoteControl {
  device: Device;

  constructor(device: Device) {
    this.device = device;
  }

  togglePower(): void {
    if (this.device.isEnabled()) {
      this.device.disable();
    } else {
      this.device.enable();
    }
  }

  volumeUp(): void {
    this.device.setVolume(this.device.getVolume() + 10);
  }

  volumeDown(): void {
    this.device.setVolume(this.device.getVolume() - 10);
  }

  channelUp(): void {
    this.device.setChannel(this.device.getChannel() + 1);
  }
}

// 이제 추상화 계층구조로부터 클래스들을 장치 클래스들과 독립적으로 확장할 수
// 있습니다.
class AdvancedRemoteControl extends RemoteControl {
  constructor(device: Device) {
    super(device);
  }

  mute(): void {
    this.device.setVolume(0);
  }
}

// '구현' 인터페이스는 모든 구상 구현 클래스들에 공통적인 메서드를 선언하며, 이는
// 추상화의 인터페이스와 일치할 필요가 없습니다. 실제로 두 인터페이스는 완전히 다를
// 수 있습니다. 일반적으로 구현 인터페이스는 원시​(primitive) 작업들만 제공하는
// 반면 추상화는 이러한 원시 작업들을 기반으로 더 상위 수준의 작업들을 정의합니다.

// 기기를 추상화
interface Device {
  isEnabled(): boolean;
  enable(): void;
  disable(): void;
  getVolume(): number;
  setVolume(volume: number): void;
  getChannel(): number;
  setChannel(channel: number): void;
}

class Radio implements Device {
  private volume: number;
  private channel: number;

  constructor() {
    this.volume = 0;
    this.channel = 0;
  }

  isEnabled(): boolean {
    return true;
  }

  enable(): void {
    console.log("Radio is enabled");
  }

  disable(): void {
    console.log("Radio is disabled");
  }

  getVolume(): number {
    return this.volume;
  }

  setVolume(volume: number): void {
    this.volume = volume;
  }

  getChannel(): number {
    return this.channel;
  }

  setChannel(channel: number): void {
    this.channel = channel;
  }
}

class TV implements Device {
  private volume: number;
  private channel: number;

  constructor() {
    this.volume = 0;
    this.channel = 0;
  }

  isEnabled(): boolean {
    return true;
  }

  enable(): void {
    console.log("TV is enabled");
  }

  disable(): void {
    console.log("TV is disabled");
  }

  getVolume(): number {
    return this.volume;
  }

  setVolume(volume: number): void {
    this.volume = volume;
  }

  getChannel(): number {
    return this.channel;
  }

  setChannel(channel: number): void {
    this.channel = channel;
  }
}

export default function main() {
  const tv = new TV();
  const radio = new Radio();

  const remote1 = new RemoteControl(tv);
  remote1.togglePower();

  const remote2 = new AdvancedRemoteControl(radio);
  remote2.mute();
}

// 브리지 패턴은 당신이 어떤 기능의 여러 변형을 가진 모놀리식 클래스를 나누고 정돈하려 할 때 사용하세요. (예: 클래스가 다양한 데이터베이스 서버들과 작동할 수 있는 경우).
