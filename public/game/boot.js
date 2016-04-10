var bootState = {

    preload: function() {
        game.load.image('background', 'game/assets/background.png');
    },

    create: function() {
        var  bg = game.add.image(0, 0, 'background');

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('load');
    }
};