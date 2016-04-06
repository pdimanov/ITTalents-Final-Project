var loadState = {
    preload: function() {

        game.load.json('game-info', 'assets/game-info.json');

        game.load.image('tiles', 'assets/roguelike.png');

        game.load.spritesheet('textbox', 'assets/textbox-sprites.png', 200, 69);
        game.load.spritesheet('player-male', 'assets/male.png', 32, 32);
        game.load.spritesheet('player-female', 'assets/female.png', 32, 32);

        game.load.spritesheet('wolf', 'assets/monsters/wolf.png', 32, 32);
        game.load.spritesheet('spider', 'assets/monsters/spider.png', 48, 48);
        game.load.spritesheet('zombie', 'assets/monsters/zombie.png', 32, 32);
        game.load.spritesheet('angel_death', 'assets/monsters/angel_death.png', 96, 48);

        game.load.spritesheet('npc', 'assets/npc.png', 48, 48);

        game.load.tilemap('world', 'assets/final-world.json', null, Phaser.Tilemap.TILED_JSON);

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