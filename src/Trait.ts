import Entity from "./entity";

export default interface Trait {
  update(entity: Entity, deltaTime: number): void;
  getName(): string;
};
