class rankingScene extends Phaser.Scene 
{
  constructor() {
    super({ key: "Highscore"});

    this.padding = 25;
    this.topPadding = 260;

    this.add
      .bitmapText(this.padding, this.topPadding, "arcade", "RANK  SCORE   NAME")
      .setTint(0xff00ff);

    this.add
      .bitmapText(
        this.padding + 32 * 6,
        50 + this.topPadding,
        "arcade",
        "50000"
      )
      .setTint(0x0261c7);

    this.playerText = this.add
      .bitmapText(32 * 14 + this.padding, 50 + this.topPadding, "arcade", "")
      .setTint(0x0261c7);

    this.input.keyboard.enabled = false;

    this.scene.launch("InputPanel", { padding: this.padding });

    let panel = this.scene.get("InputPanel");

    panel.events.on("updateName", this.updateName, this);
    panel.events.on("submitName", this.submitName, this);
  }

  submitName() {
    this.scene.stop("InputPanel");

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

  updateName(name) {
    this.playerText.setText(name);
  }
}
