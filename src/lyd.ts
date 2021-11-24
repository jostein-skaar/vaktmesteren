export class Lyd {
  private lydsprite: Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
  private harRyddetOpp = false;

  constructor(
    lydsprite: Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound,
  ) {
    this.lydsprite = lydsprite;
    // for (const klipp of lydsprite.) {
    //   console.log(klipp);
    // }
  }

  snakk(
    spillobjekt: Phaser.GameObjects.Sprite, stemme: string,
    snakkeAnimasjon: string, ferdigAnimasjon: string, ferdigFunksjon?: () => void) {
    console.log('starter å snakke', snakkeAnimasjon);
    this.lydsprite.play(stemme);
    spillobjekt.anims.play(snakkeAnimasjon);
    this.lydsprite.once('complete', () => {
      if (this.harRyddetOpp) {
        return;
      }
      console.log('ferdig å snakke', ferdigAnimasjon);
      spillobjekt.anims.play(ferdigAnimasjon);
      if (ferdigFunksjon) {
        ferdigFunksjon();
      }
    });
  }

  avbryt() {
    this.lydsprite.stop();
  }

  ryddOpp() {
    this.avbryt();
    this.harRyddetOpp = true;
  }
}
