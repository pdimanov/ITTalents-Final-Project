var loadState = {
    preload: function() {
        var  bg = game.add.image(0, 0, 'background');

        game.load.json('game-info', 'game/assets/game-info.json');


        game.load.image('tiles', 'game/assets/roguelike.png');
        game.load.image('inventory', 'game/assets/inventory.png');
        game.load.image('itembox', 'game/assets/itembox.png');

        game.load.spritesheet('textbox', 'game/assets/textbox-sprites.png', 200, 69);
        game.load.spritesheet('slash', 'game/assets/slash.png', 49, 27);

        game.load.spritesheet('player-male', 'game/assets/male.png', 32, 32);
        game.load.spritesheet('player-female', 'game/assets/female.png', 32, 32);

        game.load.spritesheet('wolf', 'game/assets/monsters/wolf.png', 32, 32);
        game.load.spritesheet('spider', 'game/assets/monsters/spider.png', 48, 48);
        game.load.spritesheet('zombie', 'game/assets/monsters/zombie.png', 32, 32);
        game.load.spritesheet('angel_death', 'game/assets/monsters/angel_death.png', 96, 48);

        game.load.spritesheet('npc', 'game/assets/npc.png', 48, 48);

        game.load.tilemap('world', 'game/assets/final-world.json', null, Phaser.Tilemap.TILED_JSON);

        //load items
        game.load.image('equip', 'game/assets/equip.png');

        for(var i = 1; i < 6; i++) {
            var armor = 'armor' + i,
                boots = 'boots' + i,
                gloves = 'gloves' + i,
                head = 'head' + i,
                weapon = 'weapon' + i;

            game.load.image(armor, 'assets/images/shopItems/' + armor + '.png');
            game.load.image(boots, 'assets/images/shopItems/' + armor + '.png');
            game.load.image(gloves, 'assets/images/shopItems/' + armor + '.png');
            game.load.image(head, 'assets/images/shopItems/' + armor + '.png');
            game.load.image(weapon, 'assets/images/shopItems/' + armor + '.png');
        }
    },

    create: function() {

        var loading = game.add.text(0, 0, "Loading...", {
            font: "26px Verdana Bold",
            fill: "#ffcc00",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });

        loading.setTextBounds(0, 0, 800, 600);

        game.time.events.add(Phaser.Timer.SECOND * 3, this.start, this).autoDestroy = true;
    },

    start: function() {
        game.state.start('menu');
    }
};