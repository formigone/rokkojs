var Map = function(viewport, tiles, settings) {
    this.viewport = viewport;
    this.tiles = tiles;

    this.tileWidth = settings.tileWidth;
    this.tileHeight = settings.tileHeight;
    this.tileRows = settings.tileRows;
    this.tileCols = settings.tileCols;
};


var Viewport = function(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
};

Viewport.prototype.moveBy = function(x, y) {
    this.x += x;
    this.y += 0;
};


var Tile = function(skin, type) {
    this.skin = skin;
    this.type = type;
};


var MapRenderer = function(map) {
    this.map = map;
    this.width = map.viewport.width;
    this.height = map.viewport.height;

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.ctx = this.canvas.getContext('2d');
};

MapRenderer.prototype.bindTo = function(container) {
    container.appendChild(this.canvas);
};

MapRenderer.prototype.render = function(time) {
    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(0, 0, this.width, this.height);
};
