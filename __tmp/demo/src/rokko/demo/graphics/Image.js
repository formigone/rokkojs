goog.provide("rokko.demo.graphics.Image");

goog.require("goog.dom");

rokko.demo.graphics.Image = function(img, pos, size){
    /** @private */
    this.img = goog.dom.createDom("img", {src: img});

    /** @private */
    this.pos = pos;

    /** @private */
    this.size = size;
};

rokko.demo.graphics.Image.prototype.getImage = function() {
    return this.img;
};

rokko.demo.graphics.Image.prototype.getPos = function() {
    return this.pos;
};

rokko.demo.graphics.Image.prototype.getSize = function() {
    return this.size;
};
