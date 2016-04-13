function Player(json) {
    var _this = this;

    this.name = json.name;
    this.gender = json.gender;
    this.level  = json.level;
    this.exp = json.experience;
    this.health = json.health;
    this.maxHealth = json.max_health;
    this.gold = json.gold;
    this.attack = json.attack;
    this.defense = json.defense;
    this.x = parseInt(json.map_x);
    this.y = parseInt(json.map_y);
    this.completedQuest = json.completed_quest;
    this.currentQuest = json.current_quest;
    this.items = json.items;
    this.isTalking = false;
    this.progress = json.progress;
    this.currentTarget = null;
    //this.questCount = json.quest[0] ? json.quest[0].count : null;
    this.quest = json.quest[0];
    this.healNext = 0;


    var style = {font: "20px Arial", fill: "black"};
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
    this.talk2 = false;
    this.talk3 = false;
    this.talk4 = false;

    this.sprite = game.add.sprite(this.x, this.y, 'player-' + this.gender);
    this.inventory = new Inventory();
    this.inventory.addItems(this.items);

    this.npcBox = game.add.image(game.camera.x, game.camera.y, 'back');
    this.npcBox.fixedToCamera = true;
    this.npcBox.kill();

    this.cursorKeys = game.input.keyboard.createCursorKeys();

    this.animations();
    this.physics();
    this.camera();
    this.addAttack();

}

Player.prototype.passiveHeal = function() {
    if (game.time.now > this.healNext) {
        var heal = this.maxHealth / 10;
        if (this.health + heal >= this.maxHealth) {
            this.health = this.maxHealth;
        } else {
            this.health += heal;
        }
        this.healNext += 5000;

    }
};

Player.prototype.damage = function(mob) {
    return this.attack * (100 / (100 + mob.defense));
};

Player.prototype.dealDamage = function(mob) {
    var dmg = this.damage(mob);
    if (mob.currentHealth <= dmg) {
        mob.currentHealth = 0;
        mob.killMe();
    } else {
        mob.currentHealth -= dmg;
        mob.sprite.children[0].scale.setTo(mob.currentHealth / mob.health, 1);
    }
    this.fancyDamage(dmg, mob);
};

Player.prototype.fancyDamage = function(dmg, mob) {
    console.log(this.sprite.children);
    var text = game.add.text(mob.sprite.x, mob.sprite.y, parseInt(dmg), {
        font: "15px Verdana Bold",
        fill: "#FF0000"
    });

    var random = Math.random() * 20;
    random = random <= 10 ? -random : random;

    game.add.tween(text).to({x: mob.sprite.x + random, y: mob.sprite.y + 30}, 1000, Phaser.Easing.Bounce.Out, true,  100, false);
    game.time.events.add(Phaser.Timer.SECOND, function() {
        text.destroy();

    }, this).autoDestroy = true;
};


Player.prototype.targetDetection = function(monsters) {
    var dist;
    for (var i in monsters) {
        /*if (Phaser.Rectangle.intersects(this.sprite.children[0].getBounds(), monsters[i].sprite.getBounds())) {
            this.currentTarget = monsters[i];
            break;
        }*/
        var x = Math.abs(this.sprite.x - monsters[i].sprite.x);
        var y = Math.abs(this.sprite.y - monsters[i].sprite.y);
        var curr = Math.pow(x, 2) + Math.pow(y, 2);
        if (dist == undefined || curr < dist) {
            dist = curr;
            this.currentTarget = monsters[i];
        }
    }
};

Player.prototype.stopAttack = function() {
    this.sprite.children[0].animations.stop();
    this.sprite.children[0].kill();
};

Player.prototype.startAttack = function () {
    this.checkAttackPosition(this.sprite.children[0]);
    this.sprite.children[0].revive();
    this.sprite.children[0].play('doSlash');


    if (this.currentTarget.sprite && Phaser.Rectangle.intersects(this.sprite.getBounds(), this.currentTarget.sprite.getBounds())) {
        this.currentTarget.dealDamage(this);
        this.dealDamage(this.currentTarget);
    }

};

Player.prototype.interaction = function(npc) {
    var name = game.add.text(0, 0, '[NPC]: ' + npc.name, {
        font: "30px BlackChancery",
        fill: "#ffcc00",
        boundsAlignH: "center",
        boundsAlignV: "middle",
        align: 'center',
        wordWrap: true,
        wordWrapWidth: 700
    });
    name.setTextBounds(0, 10, 800, 40);

    var quote = game.add.text(0, 0, npc.quote, {
        font: "24px BlackChancery",
        fill: "#ffcc00",
        boundsAlignH: "center",
        boundsAlignV: "middle",
        align: 'center',
        wordWrap: true,
        wordWrapWidth: 700
    });
    quote.setTextBounds(0, 70, 800, 50);

    var questName = game.add.text(0, 0, 'Quest: ' + npc.quest.name + '\n' +
        npc.quest.description + '\n Kill count: ' +
        npc.quest.count + '\nREWARDS:\n' +
        npc.quest.gold + ' gold' + '\n' +
        npc.quest.experience + ' exp', {
        font: "20px BlackChancery",
        fill: "#ffcc00",
        boundsAlignH: "center",
        boundsAlignV: "middle",
        align: 'center'
    });
    questName.setTextBounds(0, 100, 800, 400);

    var button = game.add.button(335, 470, 'accept', AcceptQuest, this, 1, 0);

    var button2 = game.add.button(335, 530, 'complete', CompleteQuest, this, 0, 1);

    this.npcBox.addChild(name);
    this.npcBox.addChild(quote);
    this.npcBox.addChild(questName);
    this.npcBox.addChild(button);
    this.npcBox.addChild(button2);

    var array = npc.quest.items;
    var string = '';
    for (var i = 0; i < array.length; i++) {
        string += array[i].name;
        if (i != array.length - 1) string += ',';
    }
    var items = game.add.text(0, 0, string, {
        font: "20px BlackChancery",
        fill: "#ffcc00",
        boundsAlignH: "center",
        boundsAlignV: "middle",
        align: 'center'
    });
    items.setTextBounds(0, 400, 800, 30);
    this.npcBox.addChild(items);
};

Player.prototype.updateInteraction = function(npc) {
    this.npcBox.children[0].setText('[NPC] ' + npc.name);
    this.npcBox.children[1].setText(npc.quote);
    this.npcBox.children[2].setText('Quest: ' + npc.quest.name + '\n' +
        npc.quest.description + '\n Kill count: ' +
        npc.quest.count + '\nREWARDS:\n' +
        npc.quest.gold + ' gold\nexp -' +
        npc.quest.experience + ' exp');
    var array = npc.quest.items;
    var string = '';
    for (var i = 0; i < array.length; i++) {
        string += array[i].name;
        if (i != array.length - 1) string += ',';
    }
    //console.log(string);
    this.npcBox.children[5].setText(string);

    if ((this.completedQuest === npc.quest.id - 1 && !this.quest) || (this.completedQuest === null && npc.quest.id == 1 && !this.currentQuest)) {
        this.npcBox.children[3].revive();
    } else {
        this.npcBox.children[3].kill();
    }

    if (this.quest && this.progress >= this.quest.count) {
        this.npcBox.children[4].revive();
    } else {
        this.npcBox.children[4].kill();
    }



};

Player.prototype.checkInteraction = function(talkZone, id, npc) {
    switch (id) {
        case 1:
            this.talk1 = !!(talkZone.contains(this.sprite.x + 16, this.sprite.y + 16));
            if (this.talk1) this.updateInteraction(npc);
            break;
        case 2:
            this.talk2 = !!(talkZone.contains(this.sprite.x + 16, this.sprite.y + 16));
            if (this.talk2) this.updateInteraction(npc);
            break;
        case 3:
            this.talk3 = !!(talkZone.contains(this.sprite.x + 16, this.sprite.y + 16));
            if (this.talk3) this.updateInteraction(npc);
            break;
        case 4:
            this.talk4 = !!(talkZone.contains(this.sprite.x + 16, this.sprite.y + 16));
            if (this.talk4) this.updateInteraction(npc);
            break;
    }

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

    attack.animations.add('doSlash', [0, 1, 2, 3, 4], 30, true);
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