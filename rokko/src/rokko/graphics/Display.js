goog.provide("rokko.graphics.Display");

goog.require("goog.dom");

/**
 *
 * @param {rokko.graphics.Display.ViewPort} world
 * @param {number} width
 * @param {number} height
 * @param {boolean=} smooth
 * @param {boolean=} isDebugMode
 * @constructor
 */
rokko.graphics.Display = function (view, width, height, smooth, isDebugMode) {
   /** @private */
   this.view = view;
   this.view.len = view.width * view.height;

   /** @private */
   this.mapWidth = view.width;

   /** @private */
   this.mapHeight = view.height;

   /** @private */
   /** @type {HTMLCanvasElement} */
   this.canvas = goog.dom.createDom("canvas", {width: width || 800, height: height || 450});

   /** @private */
   /** @type {CanvasRenderingContext2D} */
   this.ctx = this.canvas.getContext("2d");
   this.ctx["webkitImageSmoothingEnabled"] = smooth || false;
   this.__RENDER_DEBUGGING_MODE__ = isDebugMode || false;
};

/**
 * @typedef {{width: number, height: number, x: number, y: number}}
 */
rokko.graphics.Display.ViewPort;

rokko.graphics.Display.prototype.render = function (entity, time) {
   var enPos = entity.getPos();
   var enSize = entity.getSize();
   var img = entity.sprite.getImage();
   var el = img.getElement(time);
   var imgPos = img.getPos();
   var imgSize = img.getSize();

   this.ctx.drawImage(el,
      imgPos.x, imgPos.y,
      imgSize.w, imgSize.h,
      enPos.x, enPos.y,
      imgSize.w * enSize.s,
      imgSize.h * enSize.s
   );

   // DEBUGGING;
   if (this.__RENDER_DEBUGGING_MODE__) {
      this.ctx.strokeStyle = "#cc0000";
      this.ctx.beginPath();
      this.ctx.rect(enPos.x, enPos.y, enSize.w || (imgSize.w * enSize.s), enSize.h || (imgSize.h * enSize.s));
      this.ctx.stroke();
   }
};

rokko.graphics.Display.prototype.show = function (container) {
   container.appendChild(this.canvas);
};

rokko.graphics.Display.prototype.setDebugMode = function (isOn) {
   this.__RENDER_DEBUGGING_MODE__ = isOn;
};

rokko.graphics.Display.prototype.isDebugMode = function () {
   return this.__RENDER_DEBUGGING_MODE__;
};

rokko.graphics.Display.prototype.clear = function () {
   this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

rokko.graphics.Display.prototype.renderMap = function (map) {
   var view = this.view;
   var viewWidth = view.width;
   var tileWidth = map.tileWidth;
   var tileHeight = map.tileHeight;
   var tiles = map.tiles;
   var tile;
   var texture;
   var x;
   var y;
   var offset = parseInt(view.y) * map.width + parseInt(view.x);

   for (var i = 0, len = view.len; i < len; i++) {
      y = parseInt(i / viewWidth);
      x = offset + i % viewWidth;

      tile = tiles[offset + x + y * map.width];
      texture = tile.texture;

      this.ctx.drawImage(texture.img,
         texture.x, texture.y,
         texture.width, texture.height,
         (x - view.x) * tileWidth, tileHeight * y,
         tileWidth, tileHeight
      );
   }
};

rokko.graphics.Display.prototype.setMapSize = function(width, height) {
   this.mapWidth = width;
   this.mapHeight = height;
};

rokko.graphics.Display.prototype.scrollViewBy = function(x, y) {
   var newX = this.view.x += x;
   var newY = this.view.y += y;
   var maxX = this.mapWidth - this.view.width - 1;

   if (newX < 0) {
      this.view.x = 0;
   } else if (newX > maxX) {
      this.view.x = maxX;
   } else {
      this.view.x = newX;
   }

   this.view.y += newY;
};
