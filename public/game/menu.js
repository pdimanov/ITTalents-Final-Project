var menuState = {
    create: function() {

        this.button = game.add.button(game.world.centerX - 100, 100, 'textbox', this.start, this, 1, 0, 2);
        this.text = game.add.text(0, 0, "Play", {
            font: "26px Verdana Bold",
            fill: "#ffcc00",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });

        this.text.setTextBounds(game.world.centerX - 100, 100, 200, 69);
    },

    start: function() {
        game.state.start('play');
    }
};