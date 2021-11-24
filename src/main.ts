import './style.css';
import Phaser from 'phaser';
import { Velkomstsene } from './velkomstsene';
import { Hovedsene } from './hovedsene';
import { Tapssene } from './tapssene';

const phaserKonfig = {
  type: Phaser.AUTO,
  // 768 - 20 (status bar)
  height: 748,
  width: 1024,
  scene: [Velkomstsene, Hovedsene, Tapssene],
  parent: 'spillkonteiner',
  backgroundColor: 0x87ceeb,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      // debug: true
    },
  },
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
    // mode: Phaser.Scale.ScaleModes.RESIZE,
    autoCenter: Phaser.Scale.Center.CENTER_BOTH,
    // autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY,s
  },
};

new Phaser.Game(phaserKonfig);
