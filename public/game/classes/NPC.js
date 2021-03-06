function Npc(json, quest) {
    //console.log(json.frame);
    this.name = json.name;
    this.x = parseInt(json.map_x);
    this.y = parseInt(json.map_y);
    this.quote = json.quote;
    this.quest = quest;

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
    //console.log('i was here');
    var text = game.add.text(0, 0, '[NPC] ' + this.name, {
        font: "15px Verdana",
        fill: "black",
        boundsAlignH: "center",
        boundsAlignV: "middle"
    });

    text.setTextBounds(this.x - 10, this.y - 15, 50, 20);
};