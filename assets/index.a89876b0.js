var d=Object.defineProperty;var m=(k,e,s)=>e in k?d(k,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):k[e]=s;var t=(k,e,s)=>(m(k,typeof e!="symbol"?e+"":e,s),s);import{P as o}from"./vendor.9fd3100d.js";const c=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerpolicy&&(i.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?i.credentials="include":r.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(r){if(r.ep)return;r.ep=!0;const i=s(r);fetch(r.href,i)}};c();class l{constructor(e){t(this,"lydsprite");t(this,"harRyddetOpp",!1);this.lydsprite=e}snakk(e,s,a,r,i){console.log("starter \xE5 snakke",a),this.lydsprite.play(s),e.anims.play(a),this.lydsprite.once("complete",()=>{this.harRyddetOpp||(console.log("ferdig \xE5 snakke",r),e.anims.play(r),i&&i())})}avbryt(){this.lydsprite.stop()}ryddOpp(){this.avbryt(),this.harRyddetOpp=!0}}class p{constructor(e){t(this,"lydStemmer");t(this,"sene");t(this,"snakk",{});t(this,"sprite");t(this,"bredde",180);t(this,"hoyde",300);this.sene=e}preload(){this.sene.load.spritesheet("vaktmester","assets/vaktmester-sprite.png",{frameWidth:this.bredde,frameHeight:this.hoyde}),this.sene.load.audioSprite("stemmer","assets/stemmer.json")}create(){this.sprite=this.sene.add.sprite(0,0,"vaktmester",0),this.sene.anims.create({key:"vaktmester-snakker",frames:this.sene.anims.generateFrameNumbers("vaktmester",{frames:[1,2]}),frameRate:6,repeat:-1}),this.sene.anims.create({key:"vaktmester-ferdigsnakka",frames:this.sene.anims.generateFrameNumbers("vaktmester",{frames:[0]}),frameRate:6,repeat:0});const e=this.sene.sound.addAudioSprite("stemmer");return this.lydStemmer=new l(e),this.snakk.introSpikerfarge=s=>this.snakking("vaktmesteren-hei-og-hjelp",s),this.snakk.feil=s=>this.snakking("vaktmesteren-feil",s),this.snakk.farger=s=>this.snakking("vaktmesteren-farger",s),this.snakk.flink=s=>this.snakking("vaktmesteren-flink",s),this.snakk.riktig=s=>this.snakking(["vaktmesteren-kjempebra","vaktmesteren-supert"][Phaser.Math.Between(0,1)],s),this.snakk.sag=s=>this.snakking("vaktmesteren-sag",s),this.snakk.skrujern=s=>this.snakking("vaktmesteren-skrujern",s),this.sprite}posisjoner(e,s){this.sprite.setPosition(e,s)}avbryt(){this.lydStemmer.avbryt(),this.sprite.anims.play("vaktmester-ferdigsnakka")}snakking(e,s){this.lydStemmer.snakk(this.sprite,e,"vaktmester-snakker","vaktmester-ferdigsnakka",s)}ryddOpp(){this.avbryt(),this.lydStemmer.ryddOpp()}}class g extends Phaser.Scene{constructor(){super({key:"velkomstsene"});t(this,"bredde");t(this,"hoyde");t(this,"logoKonteiner");t(this,"karakterVaktmesteren",new p(this))}init(){this.bredde=this.game.scale.gameSize.width,this.hoyde=this.game.scale.gameSize.height}preload(){this.karakterVaktmesteren.preload()}create(){console.log("Her er vi");const e=this.karakterVaktmesteren.create().setInteractive().once("pointerdown",()=>this.startNyttSpill()),s=this.bredde*.8;if(e.width>s){const i=s/e.width;e.setScale(i)}const a=this.add.text(0,200,"Trykk p\xE5 vaktmesteren for \xE5 starte spillet",{fontFamily:"arial",fontSize:"20px",fill:"#000",align:"center"}).setOrigin(.5,.5).setInteractive().once("pointerdown",()=>this.startNyttSpill()),r=this.add.text(0,225,"Versjon 1.1",{fontFamily:"arial",fontSize:"14px",fill:"#000",align:"center"}).setOrigin(.5,.5);this.logoKonteiner=this.add.container(0,0,[e,a,r]),this.posisjoner()}posisjoner(){const e=this.bredde/2,s=this.hoyde/2-100;this.logoKonteiner.setPosition(e,s)}startNyttSpill(){console.log("startNyttSpill fra velkomstsene"),this.ryddOpp(),this.scene.start("hovedsene",{droppIntro:!1})}ryddOpp(){this.karakterVaktmesteren.ryddOpp()}}class u{constructor(e){t(this,"lydStemmer");t(this,"sene");t(this,"snakk",{});t(this,"konteiner");t(this,"spikerKropp");t(this,"spikerMunn");t(this,"spikerOyne");t(this,"bredde",60);t(this,"hoyde",150);t(this,"intervallPeker");this.sene=e}preload(){this.sene.load.spritesheet("spiker","assets/spiker-sprite.png",{frameWidth:this.bredde,frameHeight:this.hoyde}),this.sene.load.audioSprite("stemmer","assets/stemmer.json")}create(){this.spikerKropp=this.sene.add.sprite(0,0,"spiker",0),this.spikerMunn=this.sene.add.sprite(0,0,"spiker",4),this.spikerOyne=this.sene.add.sprite(0,0,"spiker",6),this.sene.anims.create({key:"spiker-snakker",frames:this.sene.anims.generateFrameNumbers("spiker",{frames:[4,5]}),frameRate:8,repeat:-1}),this.sene.anims.create({key:"spiker-ferdigsnakka",frames:this.sene.anims.generateFrameNumbers("spiker",{frames:[4]}),frameRate:8,repeat:0}),this.sene.anims.create({key:"spiker-blunker",frames:this.sene.anims.generateFrameNumbers("spiker",{frames:[7,6]}),frameRate:4,repeat:1}),this.spikerOyne.anims.play("spiker-blunker"),this.intervallPeker=setInterval(()=>{this.spikerOyne.anims.play("spiker-blunker")},5e3),this.konteiner=this.sene.add.container(0,0,[this.spikerKropp,this.spikerOyne,this.spikerMunn]),this.sene.physics.add.existing(this.konteiner),this.konteiner.body.setGravityY(900).setBounceY(.4).setOffset(this.spikerKropp.width*-.5,this.spikerKropp.height*-.5+20).setSize(this.spikerKropp.width,this.spikerKropp.height-20);const s=this.sene.sound.addAudioSprite("stemmer");return this.lydStemmer=new l(s),this.snakk.riktig=a=>this.snakking(["spikeren-ja","spikeren-jippi","spikeren-wohoo"][Phaser.Math.Between(0,2)],a),this.snakk.wohoo=a=>this.snakking("spikeren-wohoo",a),this.snakk.feil=a=>this.snakking(["spikeren-au","spikeren-aukort"][Phaser.Math.Between(0,1)],a),this.konteiner}posisjoner(e,s){this.konteiner.setPosition(e,s)}velgFarge(e){this.spikerKropp.setFrame(e)}snakking(e,s){this.lydStemmer.snakk(this.spikerMunn,e,"spiker-snakker","spiker-ferdigsnakka",s)}avbryt(){this.lydStemmer.avbryt(),this.spikerMunn.anims.play("vaktmester-ferdigsnakka")}ryddOpp(){clearInterval(this.intervallPeker),this.avbryt(),this.lydStemmer.ryddOpp()}}class y extends Phaser.Scene{constructor(){super({key:"hovedsene"});t(this,"bredde");t(this,"hoyde");t(this,"karakterVaktmesteren",new p(this));t(this,"karakterSpikeren",new u(this));t(this,"stemmer",{});t(this,"innstillinger",{gulvhoyde:50,tidPerSpill:30,nokkelLagring:"vaktmesteren-toppresultat"});t(this,"nySpikerPosisjon");t(this,"skalStoppeVedNySpikerPosisjon",!0);t(this,"nySpikerIndex");t(this,"mellomromHammere",175);t(this,"mellomromSkrujern",30);t(this,"tidsur");t(this,"forrigeResultat",0);t(this,"resultat",0);t(this,"toppresultat",0);t(this,"resultattekst");t(this,"klokketekst");t(this,"erStartet",!1);t(this,"erSpikerTatt",!1);t(this,"droppIntro",!1)}init(e){this.nullstill(),this.bredde=this.game.scale.gameSize.width,this.hoyde=this.game.scale.gameSize.height,this.nySpikerPosisjon=this.bredde-100,console.log(this.bredde,this.hoyde,e),this.droppIntro=e.droppIntro}preload(){this.karakterVaktmesteren.preload(),this.karakterSpikeren.preload(),this.load.spritesheet("ikoner","assets/ikoner-sprite.png",{frameWidth:50,frameHeight:50}),this.load.spritesheet("hammer","assets/hammer-sprite.png",{frameWidth:150,frameHeight:90}),this.load.spritesheet("skrujern","assets/skrujern-sprite.png",{frameWidth:15,frameHeight:75}),this.load.spritesheet("sag","assets/sag-sprite.png",{frameWidth:315,frameHeight:90}),this.load.image("verktoytavle","assets/verktoytavle-sprite.png");const e=localStorage.getItem(this.innstillinger.nokkelLagring);this.toppresultat=e===null?0:+e}create(){this.input.once("pointerdown",()=>{this.erStartet||(console.log("Klikka en gang"),this.karakterVaktmesteren.avbryt(),this.startSpill())}),this.add.rectangle(0,0,this.bredde,this.hoyde,12236721).setOrigin(0,0);const e=this.physics.add.staticGroup(),s=this.add.rectangle(0,this.hoyde-this.innstillinger.gulvhoyde,this.bredde,this.innstillinger.gulvhoyde,8747096).setOrigin(0,0);e.add(s);const a=this.add.image(0,0,"verktoytavle").setOrigin(0,0);a.setPosition(this.bredde-a.width-50,100);const r=this.physics.add.staticGroup();for(let n=0;n<4;n++){const h=this.add.sprite(365+this.mellomromHammere*n,390,"hammer",n).setInteractive().on("pointerdown",()=>{this.trykketHammer(n)});r.add(h)}const i=this.add.group();for(let n=0;n<4;n++){const h=this.add.sprite(800+this.mellomromSkrujern*n,200,"skrujern",0).setInteractive().on("pointerdown",()=>{this.trykketSkrujern()});i.add(h)}this.add.sprite(450,200,"sag").setInteractive().on("pointerdown",()=>{this.trykketSag()}),this.karakterVaktmesteren.create(),this.karakterVaktmesteren.posisjoner(this.karakterVaktmesteren.bredde/2+50,this.hoyde-this.karakterVaktmesteren.hoyde/2-this.innstillinger.gulvhoyde),this.karakterSpikeren.create(),this.posisjonerSpiker(),this.karakterSpikeren.konteiner.visible=!1,this.physics.add.collider(this.karakterVaktmesteren.sprite,e),this.physics.add.collider(this.karakterSpikeren.konteiner,e),this.physics.add.collider(this.karakterSpikeren.konteiner,r),this.physics.add.collider(this.karakterSpikeren.konteiner,this.karakterVaktmesteren.sprite),this.add.sprite(this.bredde-45,5,"ikoner",2).setScale(.8).setOrigin(0,0).setInteractive(new Phaser.Geom.Rectangle(-100,-100,200,200),Phaser.Geom.Rectangle.Contains).on("pointerdown",()=>this.lukk()),this.resultattekst=this.add.text(15,20,this.hentResultattekst(),{fontFamily:"arial",fontSize:"20px",fill:"#000"}),this.klokketekst=this.add.text(75,150,"30",{fontFamily:"arial",fontSize:"80px",align:"center",fixedWidth:120,color:"#fff",backgroundColor:"#6e6b63"}),this.klokketekst.visible=!1,this.droppIntro?this.startSpill():this.karakterVaktmesteren.snakk.introSpikerfarge(()=>{this.startSpill()})}update(){if(this.skalStoppeVedNySpikerPosisjon&&this.karakterSpikeren.konteiner.x<this.nySpikerPosisjon&&(this.karakterSpikeren.konteiner.body.setVelocityX(0),this.skalStoppeVedNySpikerPosisjon=!1),this.erStartet){const e=this.innstillinger.tidPerSpill-Math.floor(this.tidsur.getElapsedSeconds());this.klokketekst.setText(""+e)}}vaktmesterFeil(){this.karakterVaktmesteren.snakk.feil()}vaktmesterRiktig(){this.karakterVaktmesteren.snakk.riktig()}nySpiker(){this.posisjonerSpiker(),this.nySpikerIndex=Phaser.Math.Between(0,3),this.karakterSpikeren.velgFarge(this.nySpikerIndex),this.karakterSpikeren.konteiner.body.setVelocityX(-800),this.skalStoppeVedNySpikerPosisjon=!0,this.erSpikerTatt=!1}trykketHammer(e){if(!this.erStartet||this.erSpikerTatt)return;console.log("Trykket",e);const s=417+this.mellomromHammere*e;this.karakterSpikeren.konteiner.setX(s),this.karakterSpikeren.konteiner.body.setVelocityY(-900),this.nySpikerIndex===e?(this.erSpikerTatt=!0,this.resultat++,this.resultattekst.setText(this.hentResultattekst()),this.karakterSpikeren.snakk.riktig(()=>{this.karakterVaktmesteren.snakk.riktig(()=>{this.nySpiker()})})):this.karakterSpikeren.snakk.feil(()=>{this.karakterVaktmesteren.snakk.feil()})}trykketSkrujern(){!this.erStartet||this.karakterVaktmesteren.snakk.skrujern()}trykketSag(){!this.erStartet||(console.log("Trykke sag"),this.karakterVaktmesteren.snakk.sag())}posisjonerSpiker(){this.karakterSpikeren.posisjoner(this.bredde-this.karakterSpikeren.bredde/2,this.hoyde-this.karakterSpikeren.hoyde/2-this.innstillinger.gulvhoyde)}hentResultattekst(){let e=`Antall riktige: ${this.resultat}`;return this.forrigeResultat>0&&(e+=`
Forrige fors\xF8k: ${this.forrigeResultat}`),this.toppresultat>0&&(e+=`
Rekord: ${this.toppresultat}`),e}startSpill(){this.erStartet||(console.log("Nytt spill startet."),this.resultat=0,this.tidsur=this.time.addEvent({delay:this.innstillinger.tidPerSpill*1e3,timeScale:1,callback:()=>{this.tap()}}),this.klokketekst.visible=!0,this.erStartet=!0,this.karakterSpikeren.konteiner.visible=!0,this.nySpiker())}lukk(){this.ryddOpp(),this.scene.start("velkomstsene")}tap(){this.karakterSpikeren.konteiner.visible=!1,this.klokketekst.visible=!1,this.ryddOpp(),this.scene.pause(),this.cameras.main.setBackgroundColor(12237498),this.cameras.main.setAlpha(.5),this.forrigeResultat=this.resultat,this.toppresultat=Math.max(this.resultat,this.toppresultat),localStorage.setItem(this.innstillinger.nokkelLagring,this.toppresultat.toString()),this.resultattekst.setText(this.hentResultattekst()),this.scene.launch("tapssene",{resultat:this.resultat,spillsene:"hovedsene"})}ryddOpp(){this.karakterVaktmesteren.ryddOpp(),this.karakterSpikeren.ryddOpp()}nullstill(){this.resultat=0,this.erStartet=!1,this.erSpikerTatt=!1,this.droppIntro=!1}}class f extends Phaser.Scene{constructor(){super({key:"tapssene"});t(this,"bredde");t(this,"hoyde");t(this,"forrigeResultat");t(this,"forrigeSpillsene")}init(e){this.bredde=this.game.scale.gameSize.width,this.hoyde=this.game.scale.gameSize.height,this.forrigeResultat=e.resultat,this.forrigeSpillsene=e.spillsene}create(){const e=`Du klarte ${this.forrigeResultat}
Trykk for \xE5 pr\xF8ve igjen`;this.add.text(this.bredde/2,this.hoyde/2,e,{fontFamily:"arial",fontSize:"20px",fill:"#000",align:"center",backgroundColor:"#87ceeb",padding:{x:5,y:5}}).setOrigin(.5,.5);const s=setTimeout(()=>{this.scene.setVisible(!1,this.forrigeSpillsene),this.scene.start("velkomstsene")},3e4);setTimeout(()=>{this.input.once("pointerdown",()=>{clearTimeout(s),console.log("startNyttSpill fra tapssene"),this.scene.start(this.forrigeSpillsene,{droppIntro:!0})})},500)}}const S={type:o.AUTO,height:748,width:1024,scene:[g,y,f],parent:"spillkonteiner",backgroundColor:8900331,physics:{default:"arcade",arcade:{gravity:{y:300}}},scale:{mode:o.Scale.ScaleModes.FIT,autoCenter:o.Scale.Center.CENTER_BOTH}};new o.Game(S);
