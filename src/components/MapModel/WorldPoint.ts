import { Map } from './Types/Map';

/**
 * Represents a point in the world with x and y coordinates.
 */
export class WorldPoint {
  constructor(
    public x: number = 0,
    public y: number = 0,
  ) {}

  /**
   * Check if the x and y values are both zero.
   *
   * @return {boolean} true if both x and y are zero, false otherwise
   */
  public isEmpty(): boolean {
    return this.x == 0 && this.y == 0;
  }

  /**
   * A method to add a WorldPoint to the current instance.
   *
   * @param {WorldPoint} p - the WorldPoint to add
   * @return {WorldPoint} the resulting WorldPoint after addition
   */
  public plus(p: WorldPoint): WorldPoint {
    return this.copy().addTo(p);
  }

  /**
   * Copies the current WorldPoint.
   *
   * @return {WorldPoint} a new WorldPoint with the same coordinates as the current one
   */
  public copy(): WorldPoint {
    return new WorldPoint(this.x, this.y);
  }

  /**
   * Adds the coordinates of the given WorldPoint to the current WorldPoint.
   *
   * @param {WorldPoint} b - The WorldPoint to add to the current point
   * @return {WorldPoint} The updated WorldPoint after adding the given point
   */
  public addTo(b: WorldPoint): WorldPoint {
    this.x += b.x;
    this.y += b.y;
    return this;
  }

  /**
   * Set the x and y coordinates to the values of the given WorldPoint.
   *
   * @param {WorldPoint} n - the WorldPoint object with the new x and y coordinates
   * @return {void}
   */
  public set(n: WorldPoint): void {
    this.x = n.x;
    this.y = n.y;
  }

  /**
   * Determines the direction from the current point to another WorldPoint.
   *
   * @param {WorldPoint} p - The world point to calculate the direction to
   * @return {WorldPoint} The calculated direction as a new WorldPoint
   */
  public directionTo(p: WorldPoint): WorldPoint {
    return new WorldPoint(Math.sign(p.x - this.x), Math.sign(p.y - this.y));
  }

  /**
   * Calculates the distance between the current point and another WorldPoint.
   *
   * @param {WorldPoint} b - the WorldPoint to calculate the distance to
   * @return {number} the distance to the given WorldPoint
   */
  public distanceTo(b: WorldPoint): number {
    return Math.sqrt(this.squaredDistanceTo(b));
  }

  /**
   * Calculates the squared distance between the current point and another WorldPoint.
   * This is more efficient than calculating the actual distance.
   *
   * @param {WorldPoint} point - The WorldPoint to calculate the squared distance to
   * @return {number} The squared distance between the points
   */
  public squaredDistanceTo(b: WorldPoint): number {
    const d = this.minus(b);
    return d.x * d.x + d.y * d.y;
  }

  /**
   * Subtracts another WorldPoint from the current instance.
   *
   * @param {WorldPoint} pointToSubtract - The WorldPoint to subtract
   * @return {WorldPoint} The resulting WorldPoint after subtraction
   */
  public minus(b: WorldPoint): WorldPoint {
    return new WorldPoint(this.x - b.x, this.y - b.y);
  }

  /**
   * Checks if this WorldPoint is equal to another WorldPoint.
   * @param {WorldPoint} b - The WorldPoint to compare with
   * @returns {boolean} true if the two WorldPoints are equal, false otherwise
   */
  public isEqual(b: WorldPoint): boolean {
    return b.x === this.x && b.y === this.y;
  }

  /**
   * Generates a generator that yields all neighboring points within the given radius.
   *
   * @param {number} radius - The radius within which to find neighboring points. Defaults to 1.
   * @returns {Generator<WorldPoint>} A generator that yields WorldPoint instances.
   */
  public *getNeighbors(radius: number = 1): Generator<WorldPoint> {
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        if (dx === 0 && dy === 0) continue; // Skip the current point
        yield new WorldPoint(this.x + dx, this.y + dy);
      }
    }
  }

  /**
   * Checks if the given position is out of bounds on the map.
   *
   * @param {WorldPoint} position - The position to check.
   * @param {Map} map - The game map containing dimensions for comparison.
   * @return {boolean} True if the position is out of bounds, false otherwise.
   */
  public isPositionOutOfBounds(position: WorldPoint, map: Map): boolean {
    return (
      position.x < 0 ||
      position.y < 0 ||
      position.x >= map.dimensions.x ||
      position.y >= map.dimensions.y
    );
  }
}
