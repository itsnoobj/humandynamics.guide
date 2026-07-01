import { describe, it, expect } from 'vitest';
import { Player } from '../lib/player';

const GRAVITY = 0.6; // must match GameCanvas constant
const GROUND_Y = 300;

function simulateJump(player: Player): number {
  player.jump();
  let minY = player.y;
  // Simulate frames until player lands
  for (let i = 0; i < 200; i++) {
    player.update(GRAVITY);
    if (player.y < minY) minY = player.y;
    if (player.grounded) break;
  }
  return GROUND_Y - player.height - minY; // max height reached above standing position
}

/**
 * Simulate a jump at a given frame rate by passing the appropriate step value.
 * step = 1.0 for 60fps, 0.5 for 120fps, 2.0 for 30fps.
 */
function simulateJumpAtFrameRate(step: number): number {
  const player = new Player({ groundY: GROUND_Y });
  player.jump();
  let minY = player.y;
  // More iterations for higher frame rates (smaller steps)
  const maxFrames = Math.ceil(400 / step);
  for (let i = 0; i < maxFrames; i++) {
    player.update(GRAVITY, step);
    if (player.y < minY) minY = player.y;
    if (player.grounded) break;
  }
  return GROUND_Y - player.height - minY;
}

describe('Player jump physics', () => {
  it('default jump clears the tallest obstacle (spike = 60px)', () => {
    const player = new Player({ groundY: GROUND_Y });
    const maxHeight = simulateJump(player);
    expect(maxHeight).toBeGreaterThan(60);
  });

  it('default jump clears pipe height (57.6px)', () => {
    const player = new Player({ groundY: GROUND_Y });
    const maxHeight = simulateJump(player);
    expect(maxHeight).toBeGreaterThan(57.6);
  });

  it('jump height provides comfortable margin (> 20px clearance over 60px spike)', () => {
    const player = new Player({ groundY: GROUND_Y });
    const maxHeight = simulateJump(player);
    expect(maxHeight).toBeGreaterThan(80);
  });

  it('jump does not go off-screen (stays within canvas)', () => {
    const player = new Player({ groundY: GROUND_Y });
    player.jump();
    for (let i = 0; i < 200; i++) {
      player.update(GRAVITY);
      expect(player.y).toBeGreaterThan(0);
      if (player.grounded) break;
    }
  });

  it('player lands back on ground after jump', () => {
    const player = new Player({ groundY: GROUND_Y });
    player.jump();
    for (let i = 0; i < 200; i++) {
      player.update(GRAVITY);
      if (player.grounded) break;
    }
    expect(player.grounded).toBe(true);
    expect(player.y).toBe(GROUND_Y - player.height);
  });

  it('cannot double-jump', () => {
    const player = new Player({ groundY: GROUND_Y });
    player.jump();
    player.update(GRAVITY);
    const vyAfterFirstFrame = player.vy;
    player.jump(); // should be no-op
    expect(player.vy).toBe(vyAfterFirstFrame);
  });

  it('jump velocity is -13', () => {
    const player = new Player({ groundY: GROUND_Y });
    expect(player.jumpVelocity).toBe(-13);
  });
});

describe('Frame-rate independence', () => {
  it('jump height is consistent between 60fps and 120fps (< 5% difference)', () => {
    const height60 = simulateJumpAtFrameRate(1.0); // 60fps
    const height120 = simulateJumpAtFrameRate(0.5); // 120fps
    const diff = Math.abs(height60 - height120) / height60;
    expect(diff).toBeLessThan(0.05);
  });

  it('jump height is consistent between 60fps and 30fps (< 5% difference)', () => {
    const height60 = simulateJumpAtFrameRate(1.0); // 60fps
    const height30 = simulateJumpAtFrameRate(2.0); // 30fps
    const diff = Math.abs(height60 - height30) / height60;
    expect(diff).toBeLessThan(0.05);
  });

  it('jump height is consistent between 60fps and 144fps (< 5% difference)', () => {
    const height60 = simulateJumpAtFrameRate(1.0); // 60fps
    const height144 = simulateJumpAtFrameRate(60 / 144); // 144fps
    const diff = Math.abs(height60 - height144) / height60;
    expect(diff).toBeLessThan(0.05);
  });

  it('player lands at all frame rates', () => {
    for (const step of [0.5, 1.0, 2.0, 60 / 144]) {
      const player = new Player({ groundY: GROUND_Y });
      player.jump();
      const maxFrames = Math.ceil(400 / step);
      for (let i = 0; i < maxFrames; i++) {
        player.update(GRAVITY, step);
        if (player.grounded) break;
      }
      expect(player.grounded).toBe(true);
      expect(player.y).toBe(GROUND_Y - player.height);
    }
  });

  it('jump clears obstacles at all frame rates', () => {
    for (const step of [0.5, 1.0, 2.0, 60 / 144]) {
      const height = simulateJumpAtFrameRate(step);
      expect(height).toBeGreaterThan(60); // must clear 60px spike
    }
  });
});
