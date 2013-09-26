goog.provide("rokko.graphics.AnimatedSprite");

goog.require("rokko.graphics.Image");
goog.require("rokko.graphics.Sprite");

/**
 *
 * @param {rokko.graphics.Image} img
 * @constructor
 */
rokko.graphics.AnimatedSprite = function(options) {
    /** @protected */
    this.defFrame = options.defaultFrame;

    /** @protected */
    this.frame = this.defFrame;

    /** @protected */
    /** @type {Object<rokko.graphics.Sprite>} */
    this.sprites = options.sprites;
};

rokko.graphics.AnimatedSprite.prototype.setSprite = function(frame, inheritKeyframe) {
    inheritKeyframe = inheritKeyframe || false;

    var keyFrame = 0;
    var sprite = this.sprites[this.frame].getImage();

    if (inheritKeyframe) {
        keyFrame = sprite.getFrame();
    }

    sprite.resetFrame();
    this.frame = frame;
    sprite.setFrame(keyFrame);
};

rokko.graphics.AnimatedSprite.prototype.resetSprite = function() {
    this.frame = this.defFrame;
};

rokko.graphics.AnimatedSprite.prototype.getSprite = function() {
    return this.sprites[this.frame];
};

rokko.graphics.AnimatedSprite.prototype.getImage = function() {
    return this.sprites[this.frame].getImage();
};
