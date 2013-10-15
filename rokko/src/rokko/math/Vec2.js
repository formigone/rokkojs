goog.provide("rokko.math.Vec2");

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
 * Maybe this shouldn't be allowed?
 *
 * @param {number} x
 * @param {number} y
 * @returns {rokko.math.Vec2} Return itself to allow chaining
 */
rokko.math.Vec2.prototype.set = function(x, y) {
   this.x = x || this.x;
   this.y = y || this.y;

   return this;
};

/**
 *
 * @param {number} x
 * @param {number} y
 * @returns {rokko.math.Vec2} Return itself to allow chaining
 */
rokko.math.Vec2.prototype.add = function(x, y) {
   this.x += x;
   this.y += y;

   return this;
};

/**
 *
 * @param {number} x
 * @param {number} y
 * @returns {rokko.math.Vec2} Return itself to allow chaining
 */
rokko.math.Vec2.prototype.subtract = function(x, y) {
   this.x -= x;
   this.y -= y;

   return this;
};

/**
 *
 * @param {number} amount
 * @returns {rokko.math.Vec2} Return itself to allow chaining
 */
rokko.math.Vec2.prototype.scale = function(amount) {
   this.x *= amount;
   this.y *= amount;

   return this;
};

/**
 *
 * @returns {number}
 */
rokko.math.Vec2.prototype.getLength = function() {
   return Math.sqrt(this.x * this.x + this.y * this.y);
};

/**
 *
 * @returns {rokko.math.Vec2}
 */
rokko.math.Vec2.prototype.normalize = function() {
   var len = this.getLength();
   this.x = this.x / len;
   this.y = this.y / len;

   return this;
};

/**
 * Return both components in a single call instead of individual gets for each one. This also helps closure to optimize the compilation so this can easily be inlined
 * @returns {{x: *, y: *}}
 */
rokko.math.Vec2.prototype.getComps = function() {
   return {x: this.x, y: this.y};
};
