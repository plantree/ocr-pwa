abstract class Engine {
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  async init(): Promise<void>;

  async recognize(imageUrl: string): Promise<string>;
}

export default Engine;
