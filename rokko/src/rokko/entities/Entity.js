goog.provide("rokko.entities.Entity");

goog.require("rokko.components.Component");
goog.require("rokko.math.Vec2");

/**
 * @typedef {{w: number, h: number, s: number}}
 */
rokko._Size;

/**
 * @param {rokko.math.Vec2} pos Position vector
 * @param {rokko._Size} size Size vector
 * @param {rokko.graphics.Sprite} sprite Sprite
 * @param {Object} options
 *
 * @constructor
 */
rokko.entities.Entity = function (pos, size, sprite, options) {
   options = options || {};

   /** @protected */
   this.components = {};

   /** @protected */
   this.pos = pos;

   /** @protected */
   this.size = size;

   /**
    * @protected
    * @type {rokko.graphics.AnimatedSprite}
    */
   this.sprite = sprite;

   /** @protected */
   this.state = options.state || rokko.entities.Entity.EntityState.STANDING_RIGHT;

   /** @protected */
   this.ID = rokko.entities.Entity.getNextId();
};

/**
 *
 * Keep track of how many entities have been created, but most importantly, provide a mechanism whereby every entity can have a unique ID
 *
 * @type {number}
 */
rokko.entities.Entity.getNextId = (function() {
   var entityCount = 0;

   return function() {
      return entityCount++;
   };
})();

/**
 *
 * @returns {rokko.math.Vec2}
 */
rokko.entities.Entity.prototype.getPos = function () {
   return this.pos;
};

/**
 *
 * @returns {rokko.math.Vec2}
 */
rokko.entities.Entity.prototype.getSize = function () {
   return this.size;
};

/**
 *
 * @returns {rokko.components.Component}
 */
rokko.entities.Entity.prototype.getComponents = function () {
   return this.components;
};

/** @enum */
rokko.entities.Entity.EntityState = {
   STANDING_LEFT: 0,
   STANDING_RIGHT: 1,
   WALKING_LEFT: 2,
   WALKING_RIGHT: 3,
   RUNNING_LEFT: 4,
   RUNNING_RIGHT: 5,
   JUMPING_UP: 6,
   JUMPING_DOWN: 7
};

/**
 *
 * @param {rokko.components.Component} comp
 */
rokko.entities.Entity.prototype.addComponent = function (comp) {
   this.components[comp.ID] = comp;
};

/**
 *
 * @param {string} id
 * @return {rokko.components.Component|null}
 */
rokko.entities.Entity.prototype.getComponent = function (id) {
   return this.components[id] || null;
};

/**
 *
 * @returns {number}
 */
rokko.entities.Entity.prototype.getId = function() {
   return this.ID;
};

rokko.entities.Entity.prototype.update = function () {
   var comps = Object.keys(this.components);

   for (var i = 0, len = comps.length; i < len; i++) {
      this.components[comps[i]].exec(this);
   }
};
