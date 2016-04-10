var menuState = {
    create: function() {

        var bg = game.add.image(0, 0, 'background');

        this.buttonPlay = game.add.button(game.world.centerX - 100, 100, 'textbox', this.start, this, 1, 0, 2);
        this.textPlay = game.add.text(0, 0, "Play", {
            font: "26px Verdana Bold",
            fill: "#ffcc00",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        this.textPlay.setTextBounds(game.world.centerX - 100, 100, 200, 69);

        this.buttonControls = game.add.button(game.world.centerX - 100, 180, 'textbox', this.controls, this, 1, 0, 2);
        this.textControls = game.add.text(0, 0, "Controls", {
            font: "26px Verdana Bold",
            fill: "#ffcc00",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        this.textControls.setTextBounds(game.world.centerX - 100, 180, 200, 69);
    },

    start: function() {
        game.state.start('play');
    },

    controls: function() {
        game.state.start('controls');
    }
};