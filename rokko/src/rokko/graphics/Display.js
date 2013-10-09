goog.provide("rokko.graphics.Display");

goog.require("goog.dom");

/**
 *
 * @constructor
 */
rokko.graphics.Display = function (width, height, smooth, isDebugMode) {
   /** @private */
   /** @type {HTMLCanvasElement} */
   this.canvas = goog.dom.createDom("canvas", {width: width || 800, height: height || 450});

   /** @private */
   /** @type {CanvasRenderingContext2D} */
   this.ctx = this.canvas.getContext("2d");
   this.ctx.webkitImageSmoothingEnabled = smooth || false;
   this.__RENDER_DEBUGGING_MODE__ = isDebugMode || false;
};

rokko.graphics.Display.prototype.render = function (entity, time) {
   var img = entity.sprite.getImage();
   var el = img.getElement(time);
   var pos = img.getPos();
   var size = img.getSize();

   this.ctx.drawImage(el, pos.x, pos.y, size.w, size.h, entity.pos.x, entity.pos.y, size.w * entity.size.s, size.h * entity.size.s);

   // DEBUGGING;
   if (this.__RENDER_DEBUGGING_MODE__) {
      this.ctx.strokeStyle = "#cc0000";
      this.ctx.beginPath();
      this.ctx.rect(entity.pos.x, entity.pos.y, entity.size.w || (size.w * entity.size.s), entity.size.h || (size.h * entity.size.s));
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
