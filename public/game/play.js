var playState = {

    create: function() {
        var _this = this;
        //game info
        $.ajax({
            method: 'GET',
            url: 'api/hero',
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

        if (this.gameInfo['heroInfo'] == null) {
            var bg = game.add.image(0, 0, 'background');
            var textMissing = game.add.text(0, 0, "You dont have a hero. Go to your profile to create one.", {
                font: "26px Verdana Bold",
                fill: "#ffcc00",
                boundsAlignH: "center",
                boundsAlignV: "middle"
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

        //Monsters

        //Items
        this.items = [];
        for(var i in this.gameInfo['allItems']) {
            this.items.push(this.gameInfo['allItems'][i]);
            console.log('item', this.items[this.items.length -1]);
        }

        //player
        this.player = new Player(this.gameInfo['heroInfo']);
        this.player.inventory.addItems([this.items[0], this.items[1]]);
        console.log('player', this.player);


        //collision with layers
        this.map.setCollisionByExclusion([], true, this.layerDecorationC);
        this.map.setCollisionByExclusion([], true, this.layerDecorationC2);

        //interactions
        this.objectNPC1Talk = this.map.objects['NPC1-talk'][0];
        //console.log(this.objectNPC1Talk);
        this.talk1 = new Phaser.Rectangle(this.objectNPC1Talk.x, this.objectNPC1Talk.y, this.objectNPC1Talk.width, this.objectNPC1Talk.height);
        //console.log(this.talk1);




        this.t = game.input.keyboard.addKey(Phaser.Keyboard.T);
        this.t.onDown.add(function() {
            if (this.player.talk1) {
                console.log('talking..');
            }
        }, this);
    },

    update: function() {
        if (this.gameInfo['userInfo'] == null) return;


        this.player.checkInteraction(this.talk1);

        //collision
        game.physics.arcade.collide(this.player.sprite, this.layerDecorationC);
        game.physics.arcade.collide(this.player.sprite, this.layerDecorationC2);

        game.physics.arcade.collide(this.player.sprite, this.npcs[0].sprite);
        game.physics.arcade.collide(this.player.sprite, this.npcs[1].sprite);
        game.physics.arcade.collide(this.player.sprite, this.npcs[2].sprite);
        game.physics.arcade.collide(this.player.sprite, this.npcs[3].sprite);

        game.physics.arcade.collide(this.player.sprite, this.monsters[0].sprite);
        game.physics.arcade.collide(this.monsters[0].sprite, this.layerDecorationC);
        game.physics.arcade.collide(this.monsters[0].sprite, this.layerDecorationC2);

        //player movement
        this.player.clearVelocity();
        this.player.movement(100);

        this.monsters[0].clearVelocity();
        this.monsters[0].movement(100);
    },

    render: function() {
        if (this.gameInfo['userInfo'] == null) return;

        //show fps
        game.debug.text(game.time.fps, 10, 20, "orange");

        //game.debug.spriteInfo(this.player.sprite, 32, 32);
    }
};