var playState = {

    create: function() {
        var _this = this;
        //game info
        $.ajax({
            method: 'GET',
            url: 'api/hero/info',
            headers: {
                'Accept' : 'application/json',
                'X-Requested-With' : 'XmlHttpRequest',
                'X-Api-Token': $.cookie('user_token')
            },
            async: false
        }).done(function(response) {
            _this.gameInfo = response;
            console.log(_this.gameInfo);
        });

        if (this.gameInfo == undefined) {
            var bg = game.add.image(0, 0, 'background');
            var textMissing = game.add.text(0, 0, "You dont have a hero.\nGo to your profile to create one.", {
                font: "26px Verdana Bold",
                fill: "#ffcc00",
                boundsAlignH: "center",
                boundsAlignV: "middle",
                align: 'center'
            });
            textMissing.setTextBounds(game.world.centerX - 100, 180, 200, 69);
            return;
        }

        //enable graphics
        this.graphics = game.add.graphics();

        //fps
        game.time.advancedTiming = true;

        //stage bg color
        game.stage.backgroundColor = '#787878';

        //map creation
        this.map = game.add.tilemap('world');
        this.map.addTilesetImage('roguelike', 'tiles');

        //map layers
        this.layerBottom = this.map.createLayer('bottom');
        this.layerDecoration = this.map.createLayer('decoration');
        this.layerDecorationC = this.map.createLayer('decoration-c');
        this.layerDecorationC2 = this.map.createLayer('decoration-c2');

        //resize layers
        this.layerBottom.resizeWorld();
        this.layerDecoration.resizeWorld();
        this.layerDecorationC.resizeWorld();
        this.layerDecorationC2.resizeWorld();

        //map Objects
        /*this.objectHomeIn = this.map.objects['HomeIn'];

        this.objectNPC1 = this.map.objects['NPC1'];
        this.objectNPC1Talk = this.map.objects['NPC1-talk'];
        this.objectSpawn1 = this.map.objects['Spawn1'];

        this.objectNPC2 = this.map.objects['NPC2'];
        this.objectNPC2Talk = this.map.objects['NPC2-talk'];
        this.objectSpawn2 = this.map.objects['Spawn2'];

        this.objectNPC3 = this.map.objects['NPC3'];
        this.objectNPC3Talk = this.map.objects['NPC3-talk'];
        this.objectSpawn3 = this.map.objects['Spawn3'];

        this.objectNPC4 = this.map.objects['NPC4'];
        this.objectNPC4Talk = this.map.objects['NPC4-talk'];
        this.objectSpawn4 = this.map.objects['Spawn4'];*/


        //NPCs and Monsters
        this.npcs = [];
        this.monsters = [];
        for(var i in this.gameInfo['allQuests']) {
            this.npcs.push(new Npc(this.gameInfo['allQuests'][i].questgiver, this.gameInfo['allQuests'][i]));
            this.monsters.push(new Monster(this.gameInfo['allQuests'][i].mob));
            console.log('npc', this.npcs[this.npcs.length - 1]);
            console.log('monster', this.monsters[this.monsters.length - 1]);
        }

        //Items
        this.items = [];
        for(var i in this.gameInfo['allItems']) {
            this.items.push(this.gameInfo['allItems'][i]);
            console.log('item', this.items[this.items.length -1]);
        }

        //player
        this.player = new Player(this.gameInfo['heroInfo']);
        this.player.interaction(this.npcs[0]);
        console.log('player', this.player);


        //collision with layers
        this.map.setCollisionByExclusion([], true, this.layerDecorationC);
        this.map.setCollisionByExclusion([], true, this.layerDecorationC2);

        //interaction areas
        this.objectNPC1Talk = this.map.objects['NPC1-talk'][0];
        this.objectNPC2Talk = this.map.objects['NPC2-talk'][0];
        this.objectNPC3Talk = this.map.objects['NPC3-talk'][0];
        this.objectNPC4Talk = this.map.objects['NPC4-talk'][0];
        this.talk1 = new Phaser.Rectangle(this.objectNPC1Talk.x, this.objectNPC1Talk.y, this.objectNPC1Talk.width, this.objectNPC1Talk.height);
        this.talk2 = new Phaser.Rectangle(this.objectNPC2Talk.x, this.objectNPC2Talk.y, this.objectNPC2Talk.width, this.objectNPC2Talk.height);
        this.talk3 = new Phaser.Rectangle(this.objectNPC3Talk.x, this.objectNPC3Talk.y, this.objectNPC3Talk.width, this.objectNPC3Talk.height);
        this.talk4 = new Phaser.Rectangle(this.objectNPC4Talk.x, this.objectNPC4Talk.y, this.objectNPC4Talk.width, this.objectNPC4Talk.height);



        this.t = game.input.keyboard.addKey(Phaser.Keyboard.T);
        this.i = game.input.keyboard.addKey(Phaser.Keyboard.I);

        this.t.onDown.add(toggleTalk, this);
        this.i.onDown.add(this.player.inventory.toggle, this.player.inventory);
        this.g = game.input.keyboard.addKey(Phaser.Keyboard.G);

        this.g.onDown.add(this.player.startAttack, this.player);
        this.g.onUp.add(this.player.stopAttack, this.player);


        //this.location = 'http://localhost:8000/home';
    },

    update: function() {
        if (this.gameInfo != undefined) {

            this.player.passiveHeal();

            /*if(this.location != window.location.href) {
                killGame();
                $('#phaser-game').remove();
            }*/

            this.player.updateHUD();
            this.player.questHudUpdate();
            this.player.checkInteraction(this.talk1, 1, this.npcs[0]);
            this.player.checkInteraction(this.talk2, 2, this.npcs[1]);
            this.player.checkInteraction(this.talk3, 3, this.npcs[2]);
            this.player.checkInteraction(this.talk4, 4, this.npcs[3]);

            this.player.targetDetection(this.monsters);

            //collision
            game.physics.arcade.collide(this.player.sprite, this.layerDecorationC);
            game.physics.arcade.collide(this.player.sprite, this.layerDecorationC2);

            for (var i in this.npcs) {
                game.physics.arcade.collide(this.player.sprite, this.npcs[i].sprite);
            }

            for (var i in this.monsters) {
                game.physics.arcade.collide(this.player.sprite, this.monsters[i].sprite);
                game.physics.arcade.collide(this.monsters[i].sprite, this.layerDecorationC);
                game.physics.arcade.collide(this.monsters[i].sprite, this.layerDecorationC2);
            }

            //player movement
            this.player.clearVelocity();
            this.player.movement(150);

            //this.monsters[0].clearVelocity();
            //this.monsters[0].movement(100);
        }
    },

    render: function() {
        if (this.gameInfo != undefined) {
            //show fps
            game.debug.text(game.time.fps, 10, 20, "orange");

            //game.debug.spriteInfo(this.player.sprite, 32, 32);
        }

    }
};

function killGame() {
    game.destroy();
}

function AcceptQuest() {
    $.ajax({
        method: 'PUT',
        url: 'api/hero/acceptQuest',
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With' : 'XmlHttpRequest',
            'X-Api-Token': $.cookie('user_token')
        },
        async: false,
        data: JSON.stringify({'map_x': playState.player.sprite.x, 'map_y': playState.player.sprite.y})
    }).done(function(response) {
        console.log(response);
        toggleTalk();
        playState.player.quest = response.quest[0];
        playState.player.currentQuest = response.current_quest;
        playState.player.questWindow.revive();
    });
}

function CompleteQuest() {
    $.ajax({
        method: 'PUT',
        url: 'api/hero/returnQuest',
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
            'X-Api-Token': $.cookie('user_token'),
            'X-Requested-With' : 'XmlHttpRequest'
        },
        async: false,
        data: JSON.stringify({"map_x":playState.player.sprite.x,"map_y":playState.player.sprite.y})
    }).done(function(response) {
        playState.player.questWindow.kill();
        console.log(response);
        toggleTalk();

        playState.player.progress = response.data.progress;
        playState.player.gold = response.data.gold;
        playState.player.exp = response.data.experience;
        playState.player.level = response.data.level;
        playState.player.maxHealth = response.data.max_health;
        playState.player.health = response.data.health;
        playState.player.quest = null;
        playState.player.completedQuest++;
        var myInv = playState.player.inventory;
        myInv.removeAllItems();
        myInv.addItems(response.data.inventory);
    });
}

/*function overlap(player, mob) {
    if (Phaser.Rectangle.intersects(player.getBounds(), mob.getBounds())) {
        console.log('overlapping');
        mob.destroy();
        game.time.events.add(Phaser.Timer.SECOND * 3, this.start, this).autoDestroy = true;
    }
}*/

function killMob(data) {
    $.ajax({
        method: 'PUT',
        url: 'api/hero/kill',
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
            'X-Api-Token': $.cookie('user_token'),
            'X-Requested-With' : 'XmlHttpRequest'
        },
        data: data
    }).done(function(response) {
        console.log(response);
        playState.player.progress = response.data.progress;
        playState.player.gold = response.data.gold;
        playState.player.exp = response.data.experience;
        playState.player.level = response.data.level;
        playState.player.maxHealth = response.data.max_health;
        playState.player.health = response.data.health;
    });
}

function toggleTalk() {
    if (!(playState.player.isTalking) && (playState.player.talk1 || playState.player.talk2 || playState.player.talk3 || playState.player.talk4)) {
        playState.player.isTalking = true;
        playState.player.npcBox.revive();
        console.log('npc box opened');
    } else {
        playState.player.isTalking = false;
        playState.player.npcBox.kill();
        console.log('npc box closed');
    }
}

function EquipItem(item) {
    $.ajax({
        method: 'PUT',
        url: 'api/hero/equip',
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
            'X-Api-Token': $.cookie('user_token'),
            'X-Requested-With' : 'XmlHttpRequest'
        },
        async: false,
        data: JSON.stringify({'id': item})
    }).done(function(response) {
        console.log(response);
        playState.player.attack = response.data.attack;
        playState.player.defense = response.data.defense;
        var array = response.data.items;
        var myInv = playState.player.inventory;
        myInv.removeAllItems();
        myInv.addItems(array);

        //playState.player.inventory = new Inventory();
        //playState.player.inventory.addItems(array);
        //console.log(myInv.image.children);
    });
}

function KillPlayer() {
    var bg = game.add.image(0, 0, 'background');
    var text = game.add.text(0, 0, "You died. Respawning in 3...", {
        font: "26px Verdana Bold",
        fill: "#ffcc00",
        boundsAlignH: "center",
        boundsAlignV: "middle",
        align: 'center'
    });
    text.setTextBounds(0, 0, 800, 600);
    bg.fixedToCamera = true;
    text.fixedToCamera = true;

    game.time.events.add(Phaser.Timer.SECOND * 3, function() {
        text.destroy();
        bg.destroy();

    }, this).autoDestroy = true;

    $.ajax({
        method: 'PUT',
        url: 'api/hero/die',
        headers: {
            'Accept' : 'application/json',
            'X-Api-Token': $.cookie('user_token'),
            'X-Requested-With' : 'XmlHttpRequest'
        }
    }).done(function(response) {
        console.log(response);
        playState.player.map_x = response.data.map_x;
        playState.player.map_y = response.data.map_y;
        playState.player.sprite.x = response.data.map_x;
        playState.player.sprite.y = response.data.map_y;
        playState.player.gold = response.data.gold;
        playState.player.health = response.data.health;
        playState.player.maxHealth = response.data.max_health;
    });
}