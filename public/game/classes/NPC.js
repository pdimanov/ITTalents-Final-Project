function Npc(json) {
    console.log(json.frame);
    this.name = json.name;
    this.x = parseInt(json.x);
    this.y = parseInt(json.y);

    this.sprite = game.add.sprite(this.x, this.y, 'npc');
    this.sprite.frame = parseInt(json.frame);
    this.sprite.scale.setTo(0.75, 0.75);

    this.physics();
    this.namePlate();
}

Npc.prototype.physics = function() {
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.immovable = true;
};

Npc.prototype.namePlate = function() {
    console.log('i was here');
    var text = game.add.text(0, 0, '[NPC] ' + this.name, {
        font: "15px Verdana Bold",
        fill: "black",
        boundsAlignH: "center",
        boundsAlignV: "middle"
    });

    text.setTextBounds(this.x - 10, this.y - 15, 50, 20);
};