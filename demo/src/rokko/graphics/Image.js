goog.provide("rokko.graphics.Image");

goog.require("goog.dom");

rokko.graphics.Image = function(img, pos, size){
    /** @private */
    this.img = goog.dom.createDom("img", {src: img});

    /** @private */
    this.pos = pos;

    /** @private */
    this.size = size;
};

rokko.graphics.Image.prototype.getImage = function() {
    return this.img;
};

rokko.graphics.Image.prototype.getPos = function() {
    return this.pos;
};

rokko.graphics.Image.prototype.getSize = function() {
    return this.size;
};
