goog.provide("rokko.graphics.Sprite");

goog.require("rokko.graphics.Image");

/**
 *
 * @param {rokko.graphics.Image} img
 * @constructor
 */
rokko.graphics.Sprite = function(img) {
    /** @protected */
    /** @type {rokko.graphics.Image} */
    this.img = img;
};

rokko.graphics.Sprite.prototype.getImage = function() {
    return this.img;
};
