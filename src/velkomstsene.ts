import { KarakterVaktmesteren } from './karakter-vaktmesteren';

export class Velkomstsene extends Phaser.Scene {
  bredde: number;
  hoyde: number;
  logoKonteiner: Phaser.GameObjects.Container;

  karakterVaktmesteren = new KarakterVaktmesteren(this);

  constructor() {
    super({ key: 'velkomstsene' });
  }

  init() {
    // this.bredde = this.cameras.main.width;
    // this.hoyde = this.cameras.main.height;
    this.bredde = this.game.scale.gameSize.width;
    this.hoyde = this.game.scale.gameSize.height;
  }

  preload() {
    this.karakterVaktmesteren.preload();
  }

  create() {
    console.log('Her er vi');
    const vaktmesteren = this.karakterVaktmesteren.create()
      .setInteractive()
      .once('pointerdown', () => this.startNyttSpill());

    const maksBredde = this.bredde * 0.8;
    if (vaktmesteren.width > maksBredde) {
      const skalering = maksBredde / vaktmesteren.width;
      // console.log('Skalerer skybil: ', skalering);
      vaktmesteren.setScale(skalering);
    }

    const startTekst = this.add.text(0, 200, 'Trykk på vaktmesteren for å starte spillet',
      { fontFamily: 'arial', fontSize: '20px', fill: '#000', align: 'center' })
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .once('pointerdown', () => this.startNyttSpill());

    const versjonTekst = this.add.text(0, 225, 'Versjon {VERSJON}',
      { fontFamily: 'arial', fontSize: '14px', fill: '#000', align: 'center' })
      .setOrigin(0.5, 0.5);

    this.logoKonteiner = this.add.container(0, 0, [vaktmesteren, startTekst, versjonTekst]);

    this.posisjoner();
  }

  private posisjoner() {
    const posisjonX = this.bredde / 2;
    const posisjonY = this.hoyde / 2 - 100;

    this.logoKonteiner.setPosition(posisjonX, posisjonY);
  }

  private startNyttSpill() {
    console.log('startNyttSpill fra velkomstsene');
    this.ryddOpp();
    this.scene.start('hovedsene', { droppIntro: false });
  }

  private ryddOpp() {
    this.karakterVaktmesteren.ryddOpp();
  }

}
