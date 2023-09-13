abstract class Engine {
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract init(): Promise<void>;

  abstract recognize(imageUrl: string): Promise<string>;
}

export default Engine;
