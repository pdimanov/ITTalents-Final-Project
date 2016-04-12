function Item(item, number) {
    var _this = this;
    this.name = item.name;
    this.id = item.id;
    this.attack = item.attack;
    this.defense = item.defense;
    this.price = item.price;
    this.slotType = item.slot_type;
    this.equipped = item.pivot.equipped;


    this.sprite = game.add.image(50, number * 35 + 50, 'itembox');
    var pic = game.add.image(0, 0, this.slotType + this.id);
    pic.scale.setTo(0.3, 0.3);
    this.sprite.addChild(pic);

    var textAttack = game.add.text(30, 5, '  ' + this.name + '  ATK:' + this.attack + '  DEF:' + this.defense + '  TYPE:' + this.slotType, {
        font: "14px Verdana Bold",
        fill: "#ffcc00"
    });
    this.sprite.addChild(textAttack);

    if (!this.equipped) {
        var buttonEquip = game.add.button(610, 5, 'equip', this.equip, this);
        this.sprite.addChild(buttonEquip);
    }
}

Item.prototype.equip = function() {
    EquipItem(this.id);
};