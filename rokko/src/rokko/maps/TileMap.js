goog.provide("rokko.map.TileMap");

/**
 * @typedef {*}
 */
rokko.map.Tile;

/**
 * @typedef {*}
 */
rokko.map.TileTexture;

/**
 *
 * @param {number} width
 * @param {number} height
 * @param {Object.<string, *>} tiles
 * @constructor
 */
rokko.map.TileMap = function(width, height, tiles) {
   this.width = width;
   this.height = height;
   this.tiles = [];

   this.init(tiles);
};

/**
 * @enum {number}
 */
rokko.map.TileMap.TileCode = {
   AIR: 0,
   SOLID: 1
};

/**
 *
 * Construct each tile with its dependencies
 *
 * @param {Object.<string, *>} tiles
 */
rokko.map.TileMap.prototype.init = function(tiles) {
};

/**
 * Convert a 2D coordinate into an index from a flat array, then return the corresponding tile
 *
 * @param {number} x
 * @param {number} y
 * @returns {rokko.map.Tile}
 */
rokko.map.TileMap.prototype.getTile = function(x, y) {
   return this.tiles[this.width * y + x];
};
