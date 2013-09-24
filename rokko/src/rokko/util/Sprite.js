goog.provide("rokko.util.Sprite");

goog.require("goog.dom");

/**
 *
 * @constructor
 */
rokko.util.Sprite = function(sheet, options) {
    this.img = goog.dom.createDom("img", {src: sheet});
    this.pos = {
        x: options.pos.x,
        y: options.pos.y
    };
    this.size = {
        w: options.size.w,
        h: options.size.h
    }
};
