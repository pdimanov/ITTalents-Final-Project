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

    this.sprite = game.add.sprite(this.x, this.y, 'player-' + this.gender);

    this.animations();
    this.physics();
    this.camera();

    this.cursorKeys = game.input.keyboard.createCursorKeys();
    this.g = game.input.keyboard.addKey(Phaser.Keyboard.G);

    this.addAttack();

}

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
        this.sprite.body.velocity.x = -integer;
        this.sprite.play('left');
    } else if (this.cursorKeys.right.isDown) {
        this.sprite.body.velocity.x = integer;
        this.sprite.play('right');
        //console.log(this.sprite.body);
    } else if (this.cursorKeys.up.isDown) {
        this.sprite.body.velocity.y = -integer;
        this.sprite.play('up');
    } else if (this.cursorKeys.down.isDown) {
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
    attack.anchor.setTo(0.5, 0.5);
    this.sprite.addChild(attack);
    this.sprite.children[0].kill();


    this.g.onDown.add(function () {
        _this.sprite.children[0].revive();
        _this.sprite.children[0].play('doSlash');

    }, this);
    this.g.onUp.add(function() {
        _this.sprite.children[0].animations.stop();
        _this.sprite.children[0].kill();
    }, this);
};