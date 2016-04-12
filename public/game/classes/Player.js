function Player(json) {
    var _this = this;

    this.name = json.name;
    this.gender = json.gender;
    this.level  = json.level;
    this.exp = json.experience;
    this.health = json.health;
    this.gold = json.gold;
    this.attack = json.attack;
    this.defense = json.defense;
    this.x = parseInt(json.map_x);
    this.y = parseInt(json.map_y);
    this.completedQuest = json.completedQuest;
    this.currentQuest = json.currentQuest;
    this.items = json.items;
    this.isTalking = false;

    this.progress = 0;


    var style = {
        font: "20px Arial",
        fill: "black"
    };
    this.levelHUD = game.add.text(10, 425, 'LVL: ' + this.level, style);
    this.expHUD = game.add.text(10, 450, 'EXP: ' + this.exp, style);
    this.healthHUD = game.add.text(10, 475, 'HP: ' + this.health, style);
    this.attackHUD = game.add.text(10, 500, 'ATK: ' + this.attack, style);
    this.defenseHUD = game.add.text(10, 525, 'DEF: ' + this.defense, style);
    this.progressHUD = game.add.text(10, 550, 'PROGRESS: ' + this.progress, style);
    this.goldHUD = game.add.text(10, 575, 'GOLD: ' + this.gold, style);
    this.levelHUD.fixedToCamera = true;
    this.expHUD.fixedToCamera = true;
    this.healthHUD.fixedToCamera = true;
    this.attackHUD.fixedToCamera = true;
    this.defenseHUD.fixedToCamera = true;
    this.progressHUD.fixedToCamera = true;
    this.goldHUD.fixedToCamera = true;


    this.talk1 = false;

    this.sprite = game.add.sprite(this.x, this.y, 'player-' + this.gender);
    this.inventory = new Inventory();
    this.inventory.addItems(this.items);

    this.cursorKeys = game.input.keyboard.createCursorKeys();
    this.g = game.input.keyboard.addKey(Phaser.Keyboard.G);
    this.i = game.input.keyboard.addKey(Phaser.Keyboard.I);


    this.npcBox = game.add.image(game.camera.x, game.camera.y, 'npcbox');
    this.npcBox.fixedToCamera = true;
    this.npcBox.kill();



    this.animations();
    this.physics();
    this.camera();
    this.addAttack();

    this.g.onDown.add(function () {
        _this.checkAttackPosition(_this.sprite.children[0]);
        _this.sprite.children[0].revive();
        _this.sprite.children[0].play('doSlash');

        if (Phaser.Rectangle.intersects(_this.sprite.children[0].getBounds(), playState.monsters[0].sprite.getBounds())) {
            playState.monsters[0].sprite.destroy();

            game.time.events.add(Phaser.Timer.SECOND * 4, function() {
                playState.monsters[0].spawn();
                playState.monsters[0].physics();
                playState.monsters[0].animations();
                playState.monsters[0].healthBar();
                //playState.monsters[0].sprite.revive();
            }, this).autoDestroy = true;


            var asd = {
                "mob_id":parseInt(playState.monsters[0].id),
                "map_x":_this.sprite.x,
                "map_y":_this.sprite.y
            };
            console.log(asd);
            killMob(JSON.stringify(asd));
        }
    });
    this.g.onUp.add(function() {
        _this.sprite.children[0].animations.stop();
        _this.sprite.children[0].kill();
    }, this);

    this.i.onDown.add(function () {
        _this.inventory.toggle();
    });


}

Player.prototype.interaction = function(npc) {
    var _this = this;
    var quote = game.add.text(0, 0, npc.quote, {
        font: "20px Verdana Bold",
        fill: "#ffcc00",
        boundsAlignH: "center",
        boundsAlignV: "middle",
        align: 'center'
    });
    quote.setTextBounds(0, 50, 800, 50);

    var questName = game.add.text(0, 0, 'Quest: ' + npc.quest.name + '\n' +
        npc.quest.description + '\n Count: ' +
        npc.quest.count + '\nREWARDS:\n' + 'gold - ' +
        npc.quest.gold + '\nexp -' +
        npc.quest.experience, {
        font: "18px Verdana Bold",
        fill: "#ffcc00",
        boundsAlignH: "center",
        boundsAlignV: "middle",
        align: 'center'
    });
    questName.setTextBounds(0, 100, 800, 400);

    var button = game.add.button(370, 500, 'accept', AcceptQuest, this);

    var button2 = game.add.button(370, 500, 'complete', CompleteQuest(JSON.stringify({"map_x":this.sprite.x,"map_y":this.sprite.y})), this);




    this.npcBox.addChild(quote);
    this.npcBox.addChild(questName);
    this.npcBox.addChild(button);
    this.npcBox.addChild(button2);
};

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
    this.checkAttackPosition(this.sprite.children[0]);
};

Player.prototype.updateHUD = function() {
    this.levelHUD.setText('LVL: ' + this.level);
    this.expHUD.setText('EXP: ' + this.exp);
    this.healthHUD.setText('HP: ' + this.health);
    this.attackHUD.setText('ATK: ' + this.attack);
    this.defenseHUD.setText('DEF: ' + this.defense);
    this.progressHUD.setText('PROGRESS: ' + this.progress);
    this.goldHUD.setText('GOLD: ' + this.gold);
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