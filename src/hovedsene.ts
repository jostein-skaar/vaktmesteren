import { KarakterVaktmesteren } from './karakter-vaktmesteren';
import { KarakterSpikeren } from './karakter-spikeren';

export class Hovedsene extends Phaser.Scene {
  bredde: number;
  hoyde: number;

  karakterVaktmesteren = new KarakterVaktmesteren(this);
  karakterSpikeren = new KarakterSpikeren(this);

  stemmer: any = {};

  innstillinger = {
    gulvhoyde: 50,
    tidPerSpill: 30,
    nokkelLagring: 'vaktmesteren-toppresultat',
  };

  nySpikerPosisjon: number;
  skalStoppeVedNySpikerPosisjon = true;
  nySpikerIndex: number;

  mellomromHammere = 175;
  mellomromSkrujern = 30;

  tidsur: Phaser.Time.TimerEvent;

  forrigeResultat = 0;
  resultat = 0;
  toppresultat = 0;
  resultattekst: Phaser.GameObjects.Text;

  klokketekst: Phaser.GameObjects.Text;

  erStartet = false;
  erSpikerTatt = false;
  droppIntro = false;

  constructor() {
    super({ key: 'hovedsene' });
  }

  init(data: any) {
    this.nullstill();

    this.bredde = this.game.scale.gameSize.width;
    this.hoyde = this.game.scale.gameSize.height;
    this.nySpikerPosisjon = this.bredde - 100;
    // this.sound.volume = 0.3;
    console.log(this.bredde, this.hoyde, data);
    this.droppIntro = data.droppIntro;
    // this.sound.mute = true;

    // setInterval(() => {
    //   const x = this.input.mousePointer.x;
    //   const y = this.input.mousePointer.y;
    //   console.log(x, y);
    // }, 1000);
  }

  preload() {
    this.karakterVaktmesteren.preload();
    this.karakterSpikeren.preload();

    this.load.spritesheet('ikoner', 'assets/ikoner-sprite.png', { frameWidth: 50, frameHeight: 50 });
    this.load.spritesheet('hammer', 'assets/hammer-sprite.png', { frameWidth: 150, frameHeight: 90 });
    this.load.spritesheet('skrujern', 'assets/skrujern-sprite.png', { frameWidth: 15, frameHeight: 75 });
    this.load.spritesheet('sag', 'assets/sag-sprite.png', { frameWidth: 315, frameHeight: 90 });
    this.load.image('verktoytavle', 'assets/verktoytavle-sprite.png');

    const tempToppresultat = localStorage.getItem(this.innstillinger.nokkelLagring);
    this.toppresultat = tempToppresultat === null ? 0 : +tempToppresultat;
  }

  create() {
    this.input.once('pointerdown', () => {
      if (!this.erStartet) {
        console.log('Klikka en gang');
        this.karakterVaktmesteren.avbryt();
        this.startSpill();
      }
    });

    this.add.rectangle(0, 0, this.bredde, this.hoyde, 0xbab7b1).setOrigin(0, 0);

    const verdenGruppe = this.physics.add.staticGroup();
    const gulv = this.add
      .rectangle(0, this.hoyde - this.innstillinger.gulvhoyde, this.bredde, this.innstillinger.gulvhoyde, 0x857858)
      .setOrigin(0, 0);
    verdenGruppe.add(gulv);

    const verktoytavle = this.add.image(0, 0, 'verktoytavle').setOrigin(0, 0);
    verktoytavle.setPosition(this.bredde - verktoytavle.width - 50, 100);

    const hammerGruppe = this.physics.add.staticGroup();
    for (let indeks = 0; indeks < 4; indeks++) {
      const hammer = this.add
        .sprite(365 + this.mellomromHammere * indeks, 390, 'hammer', indeks)
        .setInteractive()
        .on('pointerdown', () => {
          this.trykketHammer(indeks);
        });
      hammerGruppe.add(hammer);
    }

    const skrujernGruppe = this.add.group();
    for (let indeks = 0; indeks < 4; indeks++) {
      const skrujern = this.add
        .sprite(800 + this.mellomromSkrujern * indeks, 200, 'skrujern', 0)
        .setInteractive()
        .on('pointerdown', () => {
          this.trykketSkrujern();
        });
      skrujernGruppe.add(skrujern);
    }

    this.add
      .sprite(450, 200, 'sag')
      .setInteractive()
      .on('pointerdown', () => {
        this.trykketSag();
      });

    this.karakterVaktmesteren.create();
    this.karakterVaktmesteren.posisjoner(
      this.karakterVaktmesteren.bredde / 2 + 50,
      this.hoyde - this.karakterVaktmesteren.hoyde / 2 - this.innstillinger.gulvhoyde
    );

    this.karakterSpikeren.create();
    // this.karakterSpikeren.posisjoner(this.bredde + 500, this.hoyde + 500);
    this.posisjonerSpiker();
    this.karakterSpikeren.konteiner.visible = false;

    this.physics.add.collider(this.karakterVaktmesteren.sprite, verdenGruppe);
    this.physics.add.collider(this.karakterSpikeren.konteiner, verdenGruppe);
    this.physics.add.collider(this.karakterSpikeren.konteiner, hammerGruppe);
    this.physics.add.collider(this.karakterSpikeren.konteiner, this.karakterVaktmesteren.sprite);

    this.add
      .sprite(this.bredde - 45, 5, 'ikoner', 2)
      .setScale(0.8)
      .setOrigin(0, 0)
      .setInteractive(new Phaser.Geom.Rectangle(-100, -100, 200, 200), Phaser.Geom.Rectangle.Contains)
      .on('pointerdown', () => this.lukk());

    this.resultattekst = this.add.text(15, 20, this.hentResultattekst(), { fontFamily: 'arial', fontSize: '20px', fill: '#000' });

    this.klokketekst = this.add.text(75, 150, '30', {
      fontFamily: 'arial',
      fontSize: '80px',
      align: 'center',
      fixedWidth: 120,
      color: '#fff',
      backgroundColor: '#6e6b63',
    });
    this.klokketekst.visible = false;

    if (this.droppIntro) {
      this.startSpill();
    } else {
      this.karakterVaktmesteren.snakk.introSpikerfarge(() => {
        this.startSpill();
      });
    }

    // this.nySpiker();

    // setInterval(() => {
    //   this.teller++;
    //   this.klokketekst.setText('' + this.teller);
    // }, 1500);
  }

  update() {
    if (this.skalStoppeVedNySpikerPosisjon) {
      if (this.karakterSpikeren.konteiner.x < this.nySpikerPosisjon) {
        (this.karakterSpikeren.konteiner.body as Phaser.Physics.Arcade.Body).setVelocityX(0);
        this.skalStoppeVedNySpikerPosisjon = false;
      }
    }
    if (this.erStartet) {
      const tidIgjen = this.innstillinger.tidPerSpill - Math.floor(this.tidsur.getElapsedSeconds());
      this.klokketekst.setText('' + tidIgjen);
    }
  }

  vaktmesterFeil() {
    this.karakterVaktmesteren.snakk.feil();
  }

  vaktmesterRiktig() {
    this.karakterVaktmesteren.snakk.riktig();
  }

  nySpiker() {
    this.posisjonerSpiker();

    this.nySpikerIndex = Phaser.Math.Between(0, 3);
    this.karakterSpikeren.velgFarge(this.nySpikerIndex);

    (this.karakterSpikeren.konteiner.body as Phaser.Physics.Arcade.Body).setVelocityX(-800);

    this.skalStoppeVedNySpikerPosisjon = true;
    this.erSpikerTatt = false;
  }

  trykketHammer(indeks: number) {
    if (!this.erStartet) {
      return;
    }
    if (this.erSpikerTatt) {
      return;
    }
    console.log('Trykket', indeks);
    const x = 417 + this.mellomromHammere * indeks;
    // const y = 344;
    this.karakterSpikeren.konteiner.setX(x);
    (this.karakterSpikeren.konteiner.body as Phaser.Physics.Arcade.Body).setVelocityY(-900);

    if (this.nySpikerIndex === indeks) {
      this.erSpikerTatt = true;
      this.resultat++;
      this.resultattekst.setText(this.hentResultattekst());
      this.karakterSpikeren.snakk.riktig(() => {
        this.karakterVaktmesteren.snakk.riktig(() => {
          this.nySpiker();
        });
      });
    } else {
      this.karakterSpikeren.snakk.feil(() => {
        this.karakterVaktmesteren.snakk.feil();
      });
    }
  }

  trykketSkrujern() {
    if (!this.erStartet) {
      return;
    }
    this.karakterVaktmesteren.snakk.skrujern();
  }

  trykketSag() {
    if (!this.erStartet) {
      return;
    }
    console.log('Trykke sag');
    this.karakterVaktmesteren.snakk.sag();
  }

  private posisjonerSpiker() {
    this.karakterSpikeren.posisjoner(
      this.bredde - this.karakterSpikeren.bredde / 2,
      this.hoyde - this.karakterSpikeren.hoyde / 2 - this.innstillinger.gulvhoyde
    );
  }

  private hentResultattekst(): string {
    let tekst = `Antall riktige: ${this.resultat}`;
    if (this.forrigeResultat > 0) {
      tekst += `\nForrige forsøk: ${this.forrigeResultat}`;
    }
    if (this.toppresultat > 0) {
      tekst += `\nRekord: ${this.toppresultat}`;
    }
    return tekst;
  }

  startSpill() {
    if (this.erStartet) {
      return;
    }
    console.log('Nytt spill startet.');
    this.resultat = 0;
    this.tidsur = this.time.addEvent({
      delay: this.innstillinger.tidPerSpill * 1000,
      timeScale: 1.0,
      callback: () => {
        this.tap();
      },
    });
    this.klokketekst.visible = true;
    this.erStartet = true;
    this.karakterSpikeren.konteiner.visible = true;
    this.nySpiker();
    // this.karakterSpikeren.snakk.wohoo();
  }

  lukk() {
    this.ryddOpp();
    this.scene.start('velkomstsene');
  }

  private tap() {
    this.karakterSpikeren.konteiner.visible = false;
    this.klokketekst.visible = false;
    this.ryddOpp();

    this.scene.pause();
    this.cameras.main.setBackgroundColor(0xbababa);
    this.cameras.main.setAlpha(0.5);

    this.forrigeResultat = this.resultat;
    this.toppresultat = Math.max(this.resultat, this.toppresultat);
    localStorage.setItem(this.innstillinger.nokkelLagring, this.toppresultat.toString());
    this.resultattekst.setText(this.hentResultattekst());

    this.scene.launch('tapssene', { resultat: this.resultat, spillsene: 'hovedsene' });
  }

  private ryddOpp() {
    this.karakterVaktmesteren.ryddOpp();
    this.karakterSpikeren.ryddOpp();
  }

  private nullstill() {
    this.resultat = 0;
    this.erStartet = false;
    this.erSpikerTatt = false;
    this.droppIntro = false;
  }
}
