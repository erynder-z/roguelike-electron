import { ItemObject } from '../ItemObjects/ItemObject';

/**
 * Represents the player inventory
 */
export class Inventory {
  public items: ItemObject[] = [];

  /**
   * Get the length of the inventory.
   * @returns {number} The number of items in the inventory.
   */
  public length(): number {
    return this.items.length;
  }

  /**
   * Add an item to the inventory.
   * @param {ItemObject} item - The item to add to the inventory.
   * @returns {void}
   */
  public add(item: ItemObject): void {
    this.items.push(item);
  }

  /**
   * Remove an item from the inventory by its index.
   * @param {number} index - The index of the item to remove.
   * @returns {void}
   */
  public removeIndex(index: number): void {
    this.items.splice(index, 1);
  }
}
