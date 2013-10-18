goog.provide("rokko.graphics.Display");

goog.require("goog.dom");

/**
 *
 * @constructor
 */
rokko.graphics.Display = function (world, width, height, smooth, isDebugMode) {
   /** @private */
   
   /** @private */
   /** @type {HTMLCanvasElement} */
   this.canvas = goog.dom.createDom("canvas", {width: width || 800, height: height || 450});

   /** @private */
   /** @type {CanvasRenderingContext2D} */
   this.ctx = this.canvas.getContext("2d");
   this.ctx["webkitImageSmoothingEnabled"] = smooth || false;
   this.__RENDER_DEBUGGING_MODE__ = isDebugMode || false;
};

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
   var width = map.width;
   var height = map.height;
   var tileWidth = map.tileWidth;
   var tileHeight = map.tileHeight;
   var tiles = map.tiles;
   var tile;
   var texture;

   for (var i = 0, len = tiles.length; i < len; i++) {
      tile = tiles[i];
      texture = tile.texture;

      this.ctx.drawImage(texture.img,
         texture.x, texture.y,
         texture.width, texture.height,
         tileWidth * (i % width),
         tileHeight * parseInt(i / width),
         tileWidth, tileHeight
      );
   }
};
