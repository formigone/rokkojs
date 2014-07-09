goog.provide("rokko.map.TileMap");

/**
 *
 * @param {Object.<string, *>} options
 * @constructor
 */
rokko.map.TileMap = function(options) {
   this.width = options.width;
   this.height = options.height;
   this.tileWidth = options.tileWidth;
   this.tileHeight = options.tileHeight;
   this.tiles = options.tiles;
};

/**
 * @enum {number}
 */
rokko.map.TileMap.TileCode = {
   AIR: 0,
   SOLID: 1
};

/**
 * @typedef {{texture: rokko.map.TileMap.TileTexture, code: rokko.map.TileMap.TileCode}}
 */
rokko.map.TileMap.Tile;

/**
 * @typedef {{img: HTMLImageElement, x: number, y: number, width: number, height: number}}
 */
rokko.map.TileMap.TileTexture;


/**
 * Convert a 2D coordinate into an index from a flat array, then return the corresponding tile
 *
 * @param {number} x
 * @param {number} y
 * @returns {rokko.map.TileMap.Tile}
 */
rokko.map.TileMap.prototype.getTile = function(x, y) {
   return this.tiles[this.width * y + x];
};
