import { Entity } from ".";
import { Trait } from "./trait";

export class EntityGraph {
  private entities: Entity[];
  private entitiesByTrait: { [id: string]: Entity[] };

  constructor() {
    this.entities = [];
    this.entitiesByTrait = {};
  }

  public getEntitiesByTraits(trait: Trait): Entity[] {
    return this.entitiesByTrait[trait.getName()] || [];
  }

  public getEntitiesByTraitName(traitName: string): Entity[] {
    return this.entitiesByTrait[traitName] || [];
  }

  // Use this method to register an entity with the entity graph
  // Entities that are shared on an entity graph, will be able to interact with
  // one another
  //
  // pro tip. if you want to have layer seperation for entities, just pass in different entity graphs
  public registerEntity(entity: Entity) {
    this.entities.push(entity);

    // Let's update all the trait lookups
    const traits = entity.getTraits();

    traits.forEach((trait) => {
      if (!this.entitiesByTrait[trait.getName()]) {
        this.entitiesByTrait[trait.getName()] = [];
      }

      this.entitiesByTrait[trait.getName()].push(entity);
    });
  }

  // Use this method to deregister an entity.
  // You will want to do this, once an entity is removed from the system
  public deregisterEntity(entity: Entity) {
    // Let's remove this entity from all the trait lookups
    const traits = entity.getTraits();

    traits.forEach((trait) => {
      if (!this.entitiesByTrait[trait.getName()]) {
        throw new Error("EntityGraph out of sync");
      }

      this.entitiesByTrait[trait.getName()] =
        this.entitiesByTrait[trait.getName()].filter((e) => e !== entity);

      this.entities = this.entities.filter((e) => e !== entity);
    });
  }
}
