import { Lyd } from './lyd';

export class KarakterVaktmesteren {
  lydStemmer: Lyd;
  sene: Phaser.Scene;
  snakk: any = {};
  sprite: Phaser.GameObjects.Sprite;
  bredde = 180;
  hoyde = 300;

  constructor(sene: Phaser.Scene) {
    this.sene = sene;
  }

  preload() {
    this.sene.load.spritesheet('vaktmester', 'assets/vaktmester-sprite.png', { frameWidth: this.bredde, frameHeight: this.hoyde });
    this.sene.load.audioSprite('stemmer', 'assets/stemmer.json');
  }

  create(): Phaser.GameObjects.Sprite {
    this.sprite = this.sene.add.sprite(0, 0, 'vaktmester', 0);

    this.sene.anims.create({
      key: 'vaktmester-snakker',
      frames: this.sene.anims.generateFrameNumbers('vaktmester', { frames: [1, 2] }),
      frameRate: 6,
      repeat: -1
    });

    this.sene.anims.create({
      key: 'vaktmester-ferdigsnakka',
      frames: this.sene.anims.generateFrameNumbers('vaktmester', { frames: [0] }),
      frameRate: 6,
      repeat: 0
    });

    const stemmerLydsprite = this.sene.sound.addAudioSprite('stemmer');

    this.lydStemmer = new Lyd(stemmerLydsprite);

    this.snakk.introSpikerfarge = (ferdigFunksjon?: () => void) => this.snakking('vaktmesteren-hei-og-hjelp', ferdigFunksjon);

    this.snakk.feil = (ferdigFunksjon?: () => void) => this.snakking('vaktmesteren-feil', ferdigFunksjon);
    this.snakk.farger = (ferdigFunksjon?: () => void) => this.snakking('vaktmesteren-farger', ferdigFunksjon);
    this.snakk.flink = (ferdigFunksjon?: () => void) => this.snakking('vaktmesteren-flink', ferdigFunksjon);
    this.snakk.riktig = (ferdigFunksjon?: () => void) => {
      return this.snakking(['vaktmesteren-kjempebra', 'vaktmesteren-supert'][Phaser.Math.Between(0, 1)], ferdigFunksjon);
    };
    this.snakk.sag = (ferdigFunksjon?: () => void) => this.snakking('vaktmesteren-sag', ferdigFunksjon);
    this.snakk.skrujern = (ferdigFunksjon?: () => void) => this.snakking('vaktmesteren-skrujern', ferdigFunksjon);

    return this.sprite;
  }

  posisjoner(x: number, y: number) {
    this.sprite.setPosition(x, y);
  }

  avbryt() {
    this.lydStemmer.avbryt();
    this.sprite.anims.play('vaktmester-ferdigsnakka');
  }

  private snakking(stemme: string, ferdigFunksjon?: () => void) {
    this.lydStemmer.snakk(
      this.sprite, stemme, 'vaktmester-snakker', 'vaktmester-ferdigsnakka', ferdigFunksjon);
  }

  ryddOpp() {
    this.avbryt();
    this.lydStemmer.ryddOpp();
  }

}
