function Monster(json) {
    //console.log(json);
    this.name = json.name;
    this.health = json.health;
    this.attack = json.attack;
    this.defense = json.defense;
    this.spawnX = json.map_x;
    this.spawnY = json.map_y;
    this.spawnWidth = json.spawn_width;
    this.spawnHeight = json.spawn_height;
    this.gold = json.gold;
    this.exp = json.experience;
    this.isAttacked = false;

    this.sprite = undefined;

    this.spawn();
    this.physics();
    this.animations();

    this.keys = {
        "w": game.input.keyboard.addKey(Phaser.Keyboard.W),
        "a": game.input.keyboard.addKey(Phaser.Keyboard.A),
        "s": game.input.keyboard.addKey(Phaser.Keyboard.S),
        "d": game.input.keyboard.addKey(Phaser.Keyboard.D)
    };
    //console.log(this.keys)
}

Monster.prototype.spawn = function() {
    var randomX = this.spawnX + Math.floor(Math.random() * this.spawnWidth);
    var randomY = this.spawnY + Math.floor(Math.random() * this.spawnHeight);
    //console.log(randomX, randomY);
    this.sprite = game.add.sprite(randomX, randomY, this.name);

};

Monster.prototype.physics = function() {
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.immovable = true;
};

Monster.prototype.die = function() {
    this.sprite.destroy();
};

Monster.prototype.healthBar = function() {

};

Monster.prototype.animations = function() {
    var left,
        right,
        up,
        down;
    switch(this.name) {
        case 'wolf':
            left = [12, 13, 14];
            right = [24, 25, 26];
            up = [36, 37, 38];
            down = [0, 1, 2];
            break;
        case 'spider':
        case 'angel_death':
            left = [3, 4, 5];
            right = [6, 7, 8];
            up = [9, 10, 11];
            down = [0, 1, 2];
            break;
        case 'zombie':
            left = [69, 70, 71];
            right = [81, 82, 83];
            up = [93, 94, 95];
            down = [57, 58, 59];
            break;
    }
    this.sprite.animations.add('left', left, 10, true);
    this.sprite.animations.add('right', right, 10, true);
    this.sprite.animations.add('up', up, 10, true);
    this.sprite.animations.add('down', down, 10, true);
};

Monster.prototype.clearVelocity = function() {
    this.sprite.body.velocity.set(0);
};

Monster.prototype.movement = function(integer) {
    if (this.keys.a.isDown) {
        this.sprite.body.velocity.x = -integer;
        this.sprite.play('left');
    } else if (this.keys.d.isDown) {
        this.sprite.body.velocity.x = integer;
        this.sprite.play('right');
    } else if (this.keys.w.isDown) {
        this.sprite.body.velocity.y = -integer;
        this.sprite.play('up');
    } else if (this.keys.s.isDown) {
        this.sprite.body.velocity.y = integer;
        this.sprite.play('down');
    } else {
        this.sprite.animations.stop();
    }
};