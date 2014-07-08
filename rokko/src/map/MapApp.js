/**
 * Copyright (c) 2014 Rodrigo Silveira. All rights reserved.
 * http://www.rodrigo-silveira.com
 */
var main = function() {
    var sheet = [
        new Sheet('Zelda', '/img/tiles/zelda-02.png', 1, 10, 10, 16, 16)
    ];
    var tiles = [
        new Tile(sheet[0], 0, Map.TileType.SOLID),
        new Tile(sheet[0], 1, Map.TileType.AIR)
    ];
    var settings = {
        tileWidth: 16,
        tileHeight: 16,
        rows: 10,
        cols: 10
    };

    var map = new Map(tiles, sheet, settings);
    var camera = new Viewport(map, 1600 / 2, 900 / 2, 0, 0);
    var renderer = new MapRenderer(camera);

    var gameLoop = function(time) {
        renderer.render(time);

        requestAnimationFrame(gameLoop);
    };

    renderer.bindTo(document.body);
    gameLoop(0);
};
