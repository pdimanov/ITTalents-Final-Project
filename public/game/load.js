var loadState = {
    preload: function() {
        var  bg = game.add.image(0, 0, 'background');

        game.load.json('game-info', 'game/assets/game-info.json');


        game.load.image('tiles', 'game/assets/roguelike.png');
        game.load.image('inventory', 'game/assets/inventory.png');
        game.load.image('itembox', 'game/assets/itembox.png');
        game.load.image('npcbox', 'game/assets/npcbox.png');
        game.load.image('gui', 'game/assets/new/gui.png');
        game.load.image('statgui', 'game/assets/new/statgui.png');
        //game.load.image('accept', 'game/assets/accept.png');
        game.load.spritesheet('accept', 'game/assets/new/accept.png', 130, 30);
        game.load.spritesheet('complete', 'game/assets/new/complete.png', 130, 30);
        //game.load.image('complete', 'game/assets/complete.png');
        game.load.image('close', 'game/assets/close.png');
        game.load.image('healthbar', 'game/assets/healthbar.png');
        game.load.image('back', 'game/assets/new/background.png');

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

        var armor,
            boots,
            gloves,
            head,
            weapon;

        for(var i = 1; i < 26; i++) {
            if (i < 6) {
                armor = 'armor' + i;
                game.load.image(armor, 'assets/images/shopItems/' + armor + '.png');
            } else if (i < 11) {
                boots = 'boots' + i;
                game.load.image(boots, 'assets/images/shopItems/' + boots + '.png');
            } else if (i < 16) {
                gloves = 'gloves' + i;
                game.load.image(gloves, 'assets/images/shopItems/' + gloves + '.png');
            } else if (i < 21) {
                head = 'head' + i;
                game.load.image(head, 'assets/images/shopItems/' + head + '.png');
            } else {
                weapon = 'weapon' + i;
                game.load.image(weapon, 'assets/images/shopItems/' + weapon + '.png');
            }
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