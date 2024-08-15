import { CommandBase } from './CommandBase';
import { EventCategory, LogMessage } from '../Messages/LogMessage';
import { GameState } from '../Builder/Types/GameState';
import { GameMap } from '../MapModel/GameMap';
import { Mob } from '../Mobs/Mob';
import { RandomGenerator } from '../RandomGenerator/RandomGenerator';
import { WorldPoint } from '../MapModel/WorldPoint';

/**
 * Represents a command that multiplies a mob.
 */
export class MultiplyCommand extends CommandBase {
  constructor(
    public me: Mob,
    public game: GameState,
  ) {
    super(me, game);
  }
  /**
   * Executes the command.
   *
   * @return {boolean} Returns true if the command is executed successfully, otherwise false.
   */
  public execute(): boolean {
    const { game } = this;
    const { rand } = game;

    const map = <GameMap>game.currentMap();
    const p = this.find(map, rand);

    if (p == null) return true;

    this.spawnMob(p, map, game);
    return true;
  }

  /**
   * Spawns a mob at the given world point on the specified game map.
   *
   * @param {WorldPoint} wp - The coordinates of the world point where the mob should be spawned.
   * @param {GameMap} map - The game map on which the mob should be spawned.
   * @param {GameState} game - The game object.
   * @return {void} This function does not return a value.
   */
  public spawnMob(wp: WorldPoint, map: GameMap, game: GameState): void {
    const { me } = this;
    const b = game.build;

    b.addNPC(me.glyph, wp.x, wp.y, map, me.level);

    const msg = new LogMessage(
      `${me.name} is multiplying!`,
      EventCategory.mobSpawn,
    );
    game.message(msg);
  }

  /**
   * Finds a valid world point on the game map to spawn a mob.
   *
   * @param {GameMap} gameMap - The game map to search for a valid spawn point.
   * @param {RandomGenerator} randomGenerator - The random number generator to use for picking a spawn point.
   * @return {WorldPoint | null} The valid world point to spawn a mob, or null if no valid spawn point is found.
   */
  private find(
    gameMap: GameMap,
    randomGenerator: RandomGenerator,
  ): WorldPoint | null {
    const mobPosition = this.me.pos;
    const validSpawnPoints: WorldPoint[] = [];

    for (let relativeY = -1; relativeY <= 1; relativeY++) {
      for (let relativeX = -1; relativeX <= 1; relativeX++) {
        const absolutePosition = mobPosition.plus(
          new WorldPoint(relativeX, relativeY),
        );
        if (!gameMap.isBlocked(absolutePosition)) {
          validSpawnPoints.push(absolutePosition);
        }
      }
    }

    return this.pick(validSpawnPoints, randomGenerator);
  }

  /**
   * Picks a random element from the given array of WorldPoints using the provided RandomGenerator.
   *
   * @param {WorldPoint[]} c - The array of WorldPoints to pick from.
   * @param {RandomGenerator} rand - The RandomGenerator used to generate a random index.
   * @return {WorldPoint | null} The randomly picked WorldPoint, or null if the array is empty.
   */
  private pick(c: WorldPoint[], rand: RandomGenerator): WorldPoint | null {
    if (c.length == 0) return null;
    const index = rand.randomInteger(c.length);
    return c[index];
  }
}
