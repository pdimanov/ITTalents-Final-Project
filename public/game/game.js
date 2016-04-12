var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-game');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('controls', controlsState);
game.state.add('play', playState);

game.state.start('boot');