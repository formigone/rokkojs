goog.provide("rokko.graphics.Renderer");

goog.require("goog.dom");

/**
 *
 * @constructor
 */
rokko.graphics.Renderer = function (display) {
   /** @private */
   /** @type {rokko.graphics.Display} */
   this.display = display;

   /** @private */
   /** @type {rokko.entities.Entity} */
   this.entities = [];

   /** @experimental */
   this.bwMode = false;
   this.wonlyMode = false;
};

rokko.graphics.Renderer.prototype.render = function (time) {
   this.display.clear();

   for (var i = 0, len = this.entities.length; i < len; i++) {
      this.display.render(this.entities[i], time);
   }

   // Black & White mode - only set bits if alpha channel is not 0. Would be nice to do this with a fragment shader...
   if (this.bwMode) {
      var _canvas = this.display.canvas;
      var px = this.display.ctx.getImageData(0, 0, _canvas.width, _canvas.height);
      var data = px.data;
      for (var i = 0, len = data.length; i < len; i += 4) {
         data[i] = data[i + 1] = data[i + 2] = data[i + 3] == 255 ? 0 : 255;
      }

      this.display.ctx.putImageData(px, 0, 0);
   }

   if (this.wonlyMode) {
      var _canvas = this.display.canvas;
      var px = this.display.ctx.getImageData(0, 0, _canvas.width, _canvas.height);
      var data = px.data;
      for (var i = 0, len = data.length; i < len; i += 4) {
         data[i + 0] = data[i + 1] = data[i + 2] = data[i + 3] == 255 ? 200 : 0;
      }

      this.display.ctx.putImageData(px, 0, 0);
   }
};

/**
 *
 * @param {rokko.entities.Entity} entity
 */
rokko.graphics.Renderer.prototype.addEntity = function (entity) {
   this.entities.push(entity);
};
