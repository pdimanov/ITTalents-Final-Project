function Player(json) {
    var _this = this;

    this.name = json.name;
    this.gender = json.gender;
    this.level  = json.level;
    this.exp = json.exp;
    this.health = json.health;
    this.attack = json.attack;
    this.defense = json.defense;
    this.x = parseInt(json.x);
    this.y = parseInt(json.y);
    this.completedQuest = json.completedQuest;
    this.currentQuest = json.currentQuest;
    this.items = json.items;

    this.hud([
        [ 10, 450, 'LVL', this.level],
        [ 10, 475, 'EXP', this.exp],
        [ 10, 500, 'HP', this.health],
        [ 10, 525, 'ATK', this.attack],
        [ 10, 550, 'DEF', this.attack]
    ]);


    this.talk1 = false;

    this.sprite = game.add.sprite(this.x, this.y, 'player-' + this.gender);
    this.inventory = new Inventory();

    this.cursorKeys = game.input.keyboard.createCursorKeys();
    this.g = game.input.keyboard.addKey(Phaser.Keyboard.G);
    this.i = game.input.keyboard.addKey(Phaser.Keyboard.I);


    this.animations();
    this.physics();
    this.camera();
    this.addAttack();

    this.g.onDown.add(function () {
        _this.checkAttackPosition(_this.sprite.children[0]);
        _this.sprite.children[0].revive();
        _this.sprite.children[0].play('doSlash');

    });
    this.g.onUp.add(function() {
        _this.sprite.children[0].animations.stop();
        _this.sprite.children[0].kill();
    }, this);

    this.i.onDown.add(function () {
        _this.inventory.toggle();
    });
}

Player.prototype.checkInteraction = function(talk1) {
    this.talk1 = !!(talk1.contains(this.sprite.x + 16, this.sprite.y + 16));
};


Player.prototype.animations = function() {
    this.sprite.animations.add('left', [3, 4, 5], 10, true);
    this.sprite.animations.add('right', [6, 7, 8], 10, true);
    this.sprite.animations.add('up', [9, 10, 11], 10, true);
    this.sprite.animations.add('down', [0, 1, 2], 10, true);
};

Player.prototype.physics = function() {
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
};

Player.prototype.camera = function() {
    game.camera.follow(this.sprite);
};

Player.prototype.clearVelocity = function() {
    this.sprite.body.velocity.set(0);
};

Player.prototype.movement = function(integer) {
    if (this.cursorKeys.left.isDown) {
        this.sprite.children[0].direction = 'left';
        this.sprite.body.velocity.x = -integer;
        this.sprite.play('left');
    } else if (this.cursorKeys.right.isDown) {
        this.sprite.children[0].direction = 'right';
        this.sprite.body.velocity.x = integer;
        this.sprite.play('right');
    } else if (this.cursorKeys.up.isDown) {
        this.sprite.children[0].direction = 'up';
        this.sprite.body.velocity.y = -integer;
        this.sprite.play('up');
    } else if (this.cursorKeys.down.isDown) {
        this.sprite.children[0].direction = 'down';
        this.sprite.body.velocity.y = integer;
        this.sprite.play('down');
    } else {
        this.sprite.animations.stop();
    }
};

Player.prototype.hud = function(array) {
    for(var i in array) {
        var text = game.add.text(array[i][0], array[i][1], array[i][2] + ': ' + array[i][3], {
            font: "20px Arial",
            fill: "black"
        });
        text.fixedToCamera = true;
    }
};

Player.prototype.addAttack = function() {
    var _this = this;
    var attack = game.add.sprite(0, 0, 'slash');

    attack.animations.add('doSlash', [0, 1, 2, 3, 4], 35, true);
    attack.direction = 'down';

    this.sprite.addChild(attack);
    this.sprite.children[0].kill();


};

Player.prototype.checkAttackPosition = function(sprite) {

    switch(sprite.direction) {
        case 'left':
            sprite.position.x = -25;
            sprite.position.y = 45;
            sprite.angle = -90;
            break;
        case 'right':
            sprite.position.x = 57;
            sprite.position.y = -10;
            sprite.angle = 90;
            break;
        case 'down':
            sprite.position.x = 43;
            sprite.position.y = 57;
            sprite.angle = 180;
            break;
        case 'up':
            sprite.position.x = -10;
            sprite.position.y = -25;
            sprite.angle = 0;
            break;
    }
};