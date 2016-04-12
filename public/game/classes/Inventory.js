function Inventory() {
    this.image = game.add.image(game.camera.x, game.camera.y, 'inventory');
    this.isOpen = false;
    this.items = [];

    this.image.fixedToCamera = true;
    this.image.kill();
}

Inventory.prototype.toggle = function() {
    if(this.isOpen) {
        this.isOpen = false;
        this.image.kill();
        console.log('closed');
    } else {
        this.isOpen = true;
        this.image.revive();
        console.log('opened');
    }
    console.log(this.image.children);
};

Inventory.prototype.addItems = function(array) {
    for(var i = 0; i < array.length; i++) {
        var item = new Item(array[i], i);
        this.items.push(item);
        this.image.addChild(item.sprite);
    }
    console.log(this.image.children);
    console.log(this.items);
};

Inventory.prototype.removeAllItems = function() {
    for (var i = this.items.length - 1; i >= 0; i--) {
        this.image.children[i].destroy();
    }
    this.items = [];
};