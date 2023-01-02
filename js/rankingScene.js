class rankingScene extends Phaser.Scene 
{
  constructor() {
    super({ key: "rankingScene"});

  }
   
  create()
  {

  }

  submitName() {

    this.add
      .bitmapText(
        this.padding,
        50 + this.topPadding,
        "arcade",
        "1ND   50000   " + this.playerText.text
      )
      .setTint(0xff0000);

    this.add
      .bitmapText(
        this.padding,
        100 + this.topPadding,
        "arcade",
        "2ND   40000   ANT"
      )
      .setTint(0xff8200);
    this.add
      .bitmapText(
        this.padding,
        150 + this.topPadding,
        "arcade",
        "3RD   30000   .-."
      )
      .setTint(0xffff00);
    this.add
      .bitmapText(
        this.padding,
        200 + this.topPadding,
        "arcade",
        "4TH   20000   BOB"
      )
      .setTint(0x00ff00);
    this.add
      .bitmapText(
        this.padding,
        250 + this.topPadding,
        "arcade",
        "5TH   10000   ZIK"
      )
      .setTint(0x00bfff);
  }
}
