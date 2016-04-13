var controlsState = {
    create: function() {

        var bg = game.add.image(0, 0, 'background');


        this.buttonBack = game.add.button(game.world.centerX - 100, 400, 'textbox', this.back, this, 1, 0, 2);
        this.textControls = game.add.text(0, 0, "Back", {
            font: "26px Verdana Bold",
            fill: "#ffcc00",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        this.textControls.setTextBounds(game.world.centerX - 100, 400, 200, 69);

        this.textControls = game.add.text(0, 0, "Arrow Keys - Player movement\nG - Attack\nT - Talk\nI - Inventory", {
            font: "26px Verdana Bold",
            fill: "#ffcc00",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            align: "center"
        });
        this.textControls.setTextBounds(game.world.centerX - 100, 200, 200, 69);
    },

    back: function() {
        game.state.start('menu');
    }
};