import { describe, it, expect } from 'vitest';
import { getWorld, worldMissionIds, findChapterLocation, worlds } from '../hierarchy';

describe('hierarchy', () => {
  describe('getWorld', () => {
    it('returns a world by numeric id', () => {
      const world = getWorld(1);
      expect(world).toBeDefined();
      expect(world!.id).toBe(1);
    });

    it('returns a world by string id', () => {
      const world = getWorld('1');
      expect(world).toBeDefined();
      expect(world!.id).toBe(1);
    });

    it('returns undefined for invalid id', () => {
      expect(getWorld(999)).toBeUndefined();
      expect(getWorld('abc')).toBeUndefined();
    });
  });

  describe('worldMissionIds', () => {
    it('returns flat array of all mission ids across regions', () => {
      const world = worlds[0];
      if (!world || world.regions.length === 0) return;
      const ids = worldMissionIds(world);
      expect(Array.isArray(ids)).toBe(true);
      expect(ids.length).toBeGreaterThan(0);
      // Each id should be a string
      ids.forEach((id) => expect(typeof id).toBe('string'));
    });

    it('returns empty array for world with no regions', () => {
      const emptyWorld = { id: 99, title: 'X', tagline: '', worldName: 'X', landscape: '', accent: '#000', regions: [] };
      expect(worldMissionIds(emptyWorld)).toEqual([]);
    });
  });

  describe('findChapterLocation', () => {
    it('finds location for a known chapter', () => {
      // Get first mission from first world with content
      const world = worlds.find((w) => w.regions.length > 0 && w.regions[0].missions.length > 0);
      if (!world) return;
      const missionId = world.regions[0].missions[0];
      const loc = findChapterLocation(missionId);
      expect(loc).not.toBeNull();
      expect(loc!.worldId).toBe(world.id);
      expect(loc!.regionId).toBe(world.regions[0].id);
    });

    it('returns null for unknown chapter', () => {
      expect(findChapterLocation('nonexistent-999')).toBeNull();
    });
  });
});
