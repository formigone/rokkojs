goog.provide("rokko.math.Vec2");

/** @typedef {{x: number, y: number}} */
rokko._Vec2;

/**
 *
 * @constructor
 */
rokko.math.Vec2 = function(x, y) {
   /** @private */
   this.x = x || 0;

   /** @private */
   this.y = y || 0;
};

/**
 * Simple way to convert two numbers into a standard object that Vec2 can work with
 * @param {number} x
 * @param {number} y
 * @return {rokko._Vec2}
 */
rokko.math.Vec2.make = function(x, y) {
   return {x: x, y: y};
};

/**
 * Maybe this shouldn't be allowed?
 *
 * @param {rokko._Vec2|rokko.math.Vec2} vec2
 * @return {rokko.math.Vec2} Return itself to allow chaining
 */
rokko.math.Vec2.prototype.set = function(x, y) {
   this.x = x || this.x;
   this.y = y || this.y;

   return this;
};

/**
 *
 * @param {rokko._Vec2|rokko.math.Vec2} vec2
 * @return {rokko.math.Vec2} Return itself to allow chaining
 */
rokko.math.Vec2.prototype.add = function(vec2) {
   this.x += vec2.x;
   this.y += vec2.y;

   return this;
};

/**
 *
 * @param {rokko._Vec2|rokko.math.Vec2} vec2
 * @return {rokko.math.Vec2} Return itself to allow chaining
 */
rokko.math.Vec2.prototype.subtract = function(vec2) {
   this.x -= vec2.x;
   this.y -= vec2.y;

   return this;
};

/**
 *
 * @param {rokko._Vec2}|rokko.math.Vec2} vec2
 * @return {number}
 */
rokko.math.Vec2.prototype.dot = function(vec2) {
   return this.x * vec2.x + this.y * vec2.y;
};

/**
 *
 * @return {number}
 */
rokko.math.Vec2.prototype.getLength = function() {
   return Math.sqrt(this.x * this.x + this.y * this.y);
};

/**
 *
 * @return {rokko.math.Vec2}
 */
rokko.math.Vec2.prototype.normalize = function() {
   var len = this.getLength();
   this.x = this.x / len;
   this.y = this.y / len;

   return this;
};

/**
 *
 * @param {rokko._Vec2|rokko.math.Vec2} vec2
 * @return {boolean}
 */
rokko.math.Vec2.prototype.equals = function(vec2) {
   return this.x == vec2.x && this.y == vec2.y;
};


/**
 * Return both components in a single call instead of individual gets for each one. This also helps closure to optimize the compilation so this can easily be inlined
 * @return {rokko._Vec2}
 */
rokko.math.Vec2.prototype.getComps = function() {
   return {x: this.x, y: this.y};
};
