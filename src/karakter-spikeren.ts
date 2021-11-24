import { Lyd } from './lyd';

export class KarakterSpikeren {
  lydStemmer: Lyd;
  sene: Phaser.Scene;
  snakk: any = {};

  konteiner: Phaser.GameObjects.Container;
  spikerKropp: Phaser.GameObjects.Sprite;
  spikerMunn: Phaser.GameObjects.Sprite;
  spikerOyne: Phaser.GameObjects.Sprite;
  bredde = 60;
  hoyde = 150;
  intervallPeker: any;

  constructor(sene: Phaser.Scene) {
    this.sene = sene;
  }

  preload() {
    this.sene.load.spritesheet('spiker', 'assets/spiker-sprite.png', { frameWidth: this.bredde, frameHeight: this.hoyde });
    this.sene.load.audioSprite('stemmer', 'assets/stemmer.json');
  }

  create(): Phaser.GameObjects.Container {
    this.spikerKropp = this.sene.add.sprite(0, 0, 'spiker', 0);
    this.spikerMunn = this.sene.add.sprite(0, 0, 'spiker', 4);
    this.spikerOyne = this.sene.add.sprite(0, 0, 'spiker', 6);

    this.sene.anims.create({
      key: 'spiker-snakker',
      frames: this.sene.anims.generateFrameNumbers('spiker', { frames: [4, 5] }),
      frameRate: 8,
      repeat: -1
    });

    this.sene.anims.create({
      key: 'spiker-ferdigsnakka',
      frames: this.sene.anims.generateFrameNumbers('spiker', { frames: [4] }),
      frameRate: 8,
      repeat: 0
    });

    this.sene.anims.create({
      key: 'spiker-blunker',
      frames: this.sene.anims.generateFrameNumbers('spiker', { frames: [7, 6] }),
      frameRate: 4,
      repeat: 1
    });

    this.spikerOyne.anims.play('spiker-blunker');
    this.intervallPeker = setInterval(() => {
      this.spikerOyne.anims.play('spiker-blunker');
    }, 5000);

    this.konteiner = this.sene.add.container(0, 0, [this.spikerKropp, this.spikerOyne, this.spikerMunn]);
    this.sene.physics.add.existing(this.konteiner);

    const spikerKonteinerKropp = this.konteiner.body as Phaser.Physics.Arcade.Body;
    spikerKonteinerKropp
      // .setCollideWorldBounds(true)
      .setGravityY(900)
      .setBounceY(0.4)
      .setOffset(this.spikerKropp.width * -0.5, this.spikerKropp.height * -0.5 + 20)
      .setSize(this.spikerKropp.width, this.spikerKropp.height - 20);

    const stemmerLydsprite = this.sene.sound.addAudioSprite('stemmer');

    this.lydStemmer = new Lyd(stemmerLydsprite);

    this.snakk.riktig = (ferdigFunksjon?: () => void) => {
      return this.snakking(['spikeren-ja', 'spikeren-jippi', 'spikeren-wohoo'][Phaser.Math.Between(0, 2)], ferdigFunksjon);
    };
    this.snakk.wohoo = (ferdigFunksjon?: () => void) => this.snakking('spikeren-wohoo', ferdigFunksjon);

    this.snakk.feil = (ferdigFunksjon?: () => void) => {
      return this.snakking(['spikeren-au', 'spikeren-aukort'][Phaser.Math.Between(0, 1)], ferdigFunksjon);
    };

    return this.konteiner;
  }

  posisjoner(x: number, y: number) {
    this.konteiner.setPosition(x, y);
  }

  velgFarge(indeks: number) {
    this.spikerKropp.setFrame(indeks);
  }

  private snakking(stemme: string, ferdigFunksjon?: () => void) {
    this.lydStemmer.snakk(
      this.spikerMunn, stemme, 'spiker-snakker', 'spiker-ferdigsnakka', ferdigFunksjon);
  }

  avbryt() {
    this.lydStemmer.avbryt();
    this.spikerMunn.anims.play('vaktmester-ferdigsnakka');
  }

  ryddOpp() {
    clearInterval(this.intervallPeker);
    this.avbryt();
    this.lydStemmer.ryddOpp();
  }

}
