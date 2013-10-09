goog.provide("rokko.entities.Entity");

goog.require("rokko.components.Component");
goog.require("rokko.components.DrawComponent");

/**
 * @param {number} pos Position vector
 * @param {number} size Size vector
 * @param {rokko.graphics.Sprite} sprite Sprite
 * @param {Object} options
 *
 * @constructor
 */
rokko.entities.Entity = function(pos, size, sprite, options) {
    options = options || {};

    /** @protected */
    this.components = {};

    /** @protected */
    this.pos = pos;

    /** @protected */
    this.size = size;

    /** @protected */
    /** @type {rokko.graphics.AnimatedSprite} */
    this.sprite = sprite;

    /** @protected */
    this.state = options.state || rokko.entities.Entity.EntityState.STANDING_RIGHT;
};

rokko.entities.Entity.prototype.getComponents = function() {
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
rokko.entities.Entity.prototype.addComponent = function(comp) {
    this.components[comp.ID] = comp;
};

/**
 *
 * @param {string} id
 * @return {rokko.components.Component|null}
 */
rokko.entities.Entity.prototype.getComponent = function(id) {
    return this.components[id] || null;
};

rokko.entities.Entity.prototype.update = function() {
    var comps = Object.keys(this.components);

    for (var i = 0, len = comps.length; i < len; i++) {
        this.components[comps[i]].exec(this.components[comps[i]], this);
    }
};
