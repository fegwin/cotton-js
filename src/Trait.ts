import Entity from "./Entity";

export default interface Trait {
  update(entity: Entity, deltaTime: number): void;
  getName(): string;
};
