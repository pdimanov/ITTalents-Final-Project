var playState = {

    create: function() {

        //game info
        var gameInfo = game.cache.getJSON('game-info');

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

        //NPCs
        this.npcs = [];
        for(var i in gameInfo[1]) {
            this.npcs.push(new Npc(gameInfo[1][i]));
        }

        //Monsters
        this.monsters = [];
        for(var i in gameInfo[2]) {
            this.monsters.push(new Monster(gameInfo[2][i]));
        }

        //player hud
        this.player = new Player(gameInfo[0]);
        this.player.hud([
            [ 10, 450, 'level', this.player.level],
            [ 10, 475, 'exp', this.player.exp],
            [ 10, 500, 'health', this.player.health],
            [ 10, 525, 'attack', this.player.attack],
            [ 10, 550, 'defense', this.player.attack]
        ]);

        //collision with layers
        this.map.setCollisionByExclusion([], true, this.layerDecorationC);
        this.map.setCollisionByExclusion([], true, this.layerDecorationC2);
    },

    update: function() {

        //collision
        game.physics.arcade.collide(this.player.sprite, this.layerDecorationC);
        game.physics.arcade.collide(this.player.sprite, this.layerDecorationC2);
        game.physics.arcade.collide(this.player.sprite, this.npcs[0].sprite);
        game.physics.arcade.collide(this.player.sprite, this.npcs[1].sprite);
        game.physics.arcade.collide(this.player.sprite, this.npcs[2].sprite);
        game.physics.arcade.collide(this.player.sprite, this.npcs[3].sprite);
        game.physics.arcade.collide(this.player.sprite, this.monsters[0].sprite);
        game.physics.arcade.collide(this.player.sprite, this.monsters[1].sprite);
        game.physics.arcade.collide(this.player.sprite, this.monsters[2].sprite);
        game.physics.arcade.collide(this.player.sprite, this.monsters[3].sprite);

        //player movement
        this.player.clearVelocity();
        this.player.movement(300);

        this.monsters[0].clearVelocity();
        this.monsters[0].movement(100);
    },

    render: function() {
        //show fps
        game.debug.text(game.time.fps, 10, 20, "orange");
    }
};