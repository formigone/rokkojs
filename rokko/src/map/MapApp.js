/**
 * Copyright (c) 2014 Rodrigo Silveira. All rights reserved.
 * http://www.rodrigo-silveira.com
 */
var main = function(){
    var camera = new Viewport(1600/2, 900/2, 0, 0);
    var tiles = [];
    var settings = {
        tileWidth: 16,
        tileHeight: 16,
        tileRows: 10,
        tileCols: 10
    };
    var map = new Map(camera, tiles, settings);
    var renderer = new MapRenderer(map);

    renderer.bindTo(document.body);
    renderer.render(0);
};
