function Item(item, number) {
    this.name = item.name;
    this.id = item.id;
    this.attack = item.attack;
    this.defense = item.defense;
    this.price = item.price;
    this.slotType = item.slot_type;


    this.sprite = game.add.image(50, number * 35 + 50, 'itembox');
    this.pic = game.add.image(0, 0, this.slotType + this.id);
    this.pic.scale.setTo(0.3, 0.3);
    this.sprite.addChild(this.pic);

    var textAttack = game.add.text(30, 5, '  ' + this.name + '  ATK:' + this.attack + '  DEF:' + this.defense + '  TYPE:' + this.slotType, {
        font: "14px Verdana Bold",
        fill: "#ffcc00"
    });
    this.sprite.addChild(textAttack);

    var buttonEquip = game.add.image(640, 2, 'equip');
    this.sprite.addChild(buttonEquip);
}