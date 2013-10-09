goog.provide("rokko.components.GameLoopComponent");

goog.require("rokko.components.Component");

/**
 *
 * @param {number} fps
 * @param {Array} options
 *
 * @constructor
 * @extends {rokko.components.Component}
 */
rokko.components.GameLoopComponent = function (fps, options) {
   goog.base(this, options);

   if (goog.isDefAndNotNull(options.onUpdate) && goog.isFunction(options.onUpdate)) {
      this.onUpdate = options.onUpdate;
   }

   if (goog.isDefAndNotNull(options.onDraw) && goog.isFunction(options.onDraw)) {
      this.onDraw = options.onDraw;
   }

   this.fps = fps;
   this.freq = 1000 / this.fps;
   this.delta = 0;
   this.lastTime = 0;
   this.isRunning = false;
};
goog.inherits(rokko.components.GameLoopComponent, rokko.components.Component);

/** @inheritDoc */
rokko.components.GameLoopComponent.prototype.exec = function (entity) {
   this.isRunning = true;
   this.go(0);
};

/** @inheritDoc */
rokko.components.GameLoopComponent.prototype.ID = "__GAME_LOOP_COMPONENT__";

rokko.components.GameLoopComponent.prototype.stop = function () {
   this.isRunning = true;
};

/**
 *
 * @param {number} time
 */
rokko.components.GameLoopComponent.prototype.go = function (time) {
   if (this.isRunning) {
      this.delta = time - this.lastTime;
      if (this.delta >= this.freq) {
         this.onUpdate(time);
         this.onDraw(time);

         this.lastTime = time;
      }

      requestAnimationFrame(this.go.bind(this));
   }
};

/**
 *
 * @param {number} time
 */
rokko.components.GameLoopComponent.prototype.onUpdate = function (time) {
};

/**
 *
 * @param {number} time
 */
rokko.components.GameLoopComponent.prototype.onDraw = function (time) {
};
