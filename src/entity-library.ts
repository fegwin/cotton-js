import { Entity } from ".";
import { Trait } from "./trait";

/**
 * A library of entities that may interact with one another.
 * Provides the ability to query entities by traits.
 * Entities are required to register with the EntityLibrary upon creation
 * Entities are requried to deregister with the EntityLibrary upon deletion
 */
export class EntityLibrary {
  private entities: Entity[];
  private entitiesByTrait: { [id: string]: Entity[] };

  constructor() {
    this.entities = [];
    this.entitiesByTrait = {};
  }

  /**
   * Query entities by trait name
   * @param traitName Entities which contain the following trait will be returned
   */
  public getEntitiesByTraitName(traitName: string): Entity[] {
    return this.entitiesByTrait[traitName] || [];
  }

  /**
   * Use this method to register an entity with the EntityLibrary
   * Entities that are shared on an EntityLibrary, will be able to interact with
   * one another.
   * pro tip. if you want to have layer seperation for entities, just pass in different entity graphs
   * @param entity The entity you wish to register
   */
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

  /**
   * Use this method to deregister an entity.
   * You will want to do this, once an entity is removed from the system
   * @param entity The entity you wish to deregister
   */
  public deregisterEntity(entity: Entity) {
    // Let's remove this entity from all the trait lookups
    const traits = entity.getTraits();

    traits.forEach((trait) => {
      if (!this.entitiesByTrait[trait.getName()]) {
        throw new Error("EntityLibrary out of sync");
      }

      this.entitiesByTrait[trait.getName()] =
        this.entitiesByTrait[trait.getName()].filter((e) => e !== entity);

      this.entities = this.entities.filter((e) => e !== entity);
    });
  }
}
