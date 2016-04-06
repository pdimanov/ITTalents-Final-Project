//DON'T USE THIS
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {

    game.load.tilemap('world', 'final-world.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'roguelike.png');
    game.load.spritesheet('player', 'knight.png', 32, 32);

}

var map,
    layerBottom,
    layerDecoration,
    layerDecorationC,
    layerDecorationC2,
    player,
    cursors,
    objectHomeIn,
    objectNPC1,
    objectNPC1Talk,
    objectSpawn1,
    objectNPC2,
    objectNPC2Talk,
    objectSpawn2,
    objectNPC3,
    objectNPC3Talk,
    objectSpawn3,
    objectNPC4,
    objectNPC4Talk,
    objectSpawn4;

function create() {

    //fps
    game.time.advancedTiming = true;

    //stage bg color
    game.stage.backgroundColor = '#787878';

    //map creation
    map = game.add.tilemap('world');
    map.addTilesetImage('roguelike', 'tiles');

    //map layers
    layerBottom = map.createLayer('bottom');
    layerDecoration = map.createLayer('decoration');
    layerDecorationC = map.createLayer('decoration-c');
    layerDecorationC2 = map.createLayer('decoration-c2');

    //map Objects
    objectHomeIn = map.objects['HomeIn'];

    objectNPC1 = map.objects['NPC1'];
    objectNPC1Talk = map.objects['NPC1-talk'];
    objectSpawn1 = map.objects['Spawn1'];

    objectNPC2 = map.objects['NPC2'];
    objectNPC2Talk = map.objects['NPC2-talk'];
    objectSpawn2 = map.objects['Spawn2'];

    objectNPC3 = map.objects['NPC3'];
    objectNPC3Talk = map.objects['NPC3-talk'];
    objectSpawn3 = map.objects['Spawn3'];

    objectNPC4 = map.objects['NPC4'];
    objectNPC4Talk = map.objects['NPC4-talk'];
    objectSpawn4 = map.objects['Spawn4'];

    //resize layers
    layerBottom.resizeWorld();
    layerDecoration.resizeWorld();
    layerDecorationC.resizeWorld();
    layerDecorationC2.resizeWorld();

    //player movement
    player = game.add.sprite(objectHomeIn[0].x, objectHomeIn[0].y, 'player', 1);
    player.animations.add('left', [3, 4, 5], 10, true);
    player.animations.add('right', [6, 7, 8], 10, true);
    player.animations.add('up', [9, 10, 11], 10, true);
    player.animations.add('down', [0, 1, 2], 10, true);

    //physics, lock camera
    game.physics.enable(player, Phaser.Physics.ARCADE);
    game.camera.follow(player);

    //player navigation
    cursors = game.input.keyboard.createCursorKeys();

    //collision with layers
    map.setCollisionByExclusion([], true, layerDecorationC);
    map.setCollisionByExclusion([], true, layerDecorationC2);
}

function update() {

    //collision with layers
    game.physics.arcade.collide(player, layerDecorationC);
    game.physics.arcade.collide(player, layerDecorationC2);


    player.body.velocity.set(0);

    if (cursors.left.isDown) {
        player.body.velocity.x = -100;
        player.play('left');
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 100;
        player.play('right');
    } else if (cursors.up.isDown) {
        player.body.velocity.y = -100;
        player.play('up');
    } else if (cursors.down.isDown) {
        player.body.velocity.y = 100;
        player.play('down');
    } else {
        player.animations.stop();
    }

}

function render() {
    //show fps
    game.debug.text(game.time.fps, 10, 20, "black");
}