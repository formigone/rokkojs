/**
 *
 * @param {Array.<Tile>} tiles
 * @param {Array.<Sheet>} sheets
 * @param {Object} settings
 * @constructor
 */
var Map = function(tiles, sheets, settings) {
    this.tiles = tiles;

    this.sheets = sheets;

    this.cols = settings.cols;
    this.rows = settings.rows;
    this.tileWidth = settings.tileWidth;
    this.tileHeight = settings.tileHeight;

    this.init();
};

Map.TileType = {
    AIR: 0,
    SOLID: 1
};

Map.prototype.init = function(){
    var obj = {};
    for (var i = 0, len = this.sheets.length; i < len; i++) {
        obj[this.sheets[i].name] = this.sheets[i];
    }

    this.sheets = obj;
};

/**
 *
 * @param {Map} map
 * @param {number} width Pixel width
 * @param {number} height Pixel height
 * @param {number} x Pixel offset
 * @param {number} y Pixel offset
 * @constructor
 */
var Viewport = function(map, width, height, x, y) {
    this.map = map;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.mapCol = 0;
    this.mapRow = 0;
    this.maxX = 0;
    this.maxY = 0;

    this.init();
};

Viewport.prototype.init = function(){
    this.maxX = this.map.cols * this.map.tileWidth - this.width;
    this.maxY = this.map.rows * this.map.tileHeight - this.height;

    this.constrainScroll();
    this.calculateMapOffset();
};

Viewport.prototype.calculateMapOffset = function(){
    this.mapCol = parseInt(this.x / this.map.tileWidth, 10);
    this.mapRow = parseInt(this.y / this.map.tileHeight, 10);
};

Viewport.prototype.constrainScroll = function(){
    if (this.x > this.maxX) {
        this.x = this.maxX;
    } else if (this.x < 0) {
        this.x = 0;
    }

    if (this.y > this.maxY) {
        this.y = this.maxY;
    } else if (this.y < 0) {
        this.y = 0;
    }
};

Viewport.prototype.scrollBy = function(x, y) {
    this.x += x;
    this.y += y;
    this.constrainScroll();
    this.calculateMapOffset();
};

Viewport.prototype.scrollTo = function(x, y) {
    this.x = x;
    this.y = y;
    this.constrainScroll();
    this.calculateMapOffset();
};


var Sheet = function(name, img, padding, rows, cols, width, height) {
    this.name = name;
    this.img = new Image();
    this.img.src = img;
    this.padding = padding;
    this.rows = rows;
    this.cols = cols;
    this.width = width;
    this.height = height;
};


var Tile = function(sheet, cell, type) {
    this.sheet = sheet;
    this.cell = cell;
    this.type = type;
};


var MapRenderer = function(viewport) {
    this.viewport = viewport;
    this.map = viewport.map;
    this.width = this.viewport.width;
    this.height = this.viewport.height;
    this.tiles = this.map.tiles;

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.ctx = this.canvas.getContext('2d');
};

MapRenderer.prototype.bindTo = function(container) {
    container.appendChild(this.canvas);
};

MapRenderer.prototype.render = function(time) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    var tileIndex = 0;
    var tile;
    var x = 0;
    var y = 0;

    // TODO: calculate total tiles to render based on viewport width (in px)
    for (var i = 0, len = this.tiles.length; i < len; i++) {
        // TODO: grab correct tile
        tileIndex = parseInt(this.viewport.x, 10) * i;
        tile = this.tiles[tileIndex];
        this.ctx.drawImage(tile.sheet.img, i * this.map.tileWidth, 0, i * this.map.tileWidth, this.map.tileHeight);
    }
};
