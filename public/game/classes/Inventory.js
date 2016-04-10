function Inventory() {
    this.image = game.add.image(game.camera.x, game.camera.y, 'inventory');
    this.items = 0;
    this.isOpen = false;

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
};

Inventory.prototype.addItems = function(array) {
    for(var i in array) {
        //this.items.push(new Item(array[i]));
        this.image.addChild(new Item(array[i], this.items).sprite);
        this.items++;
    }
};