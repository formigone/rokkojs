goog.provide("rokko.components.DrawComponent");

goog.require("rokko.components.Component");
goog.require("goog.dom");

/**
 *
 * @constructor
 * @extends {rokko.components.Component}
 */
rokko.components.DrawComponent = function(width, height, smooth) {
    goog.base(this);

    /** @private */
    /** @type {HTMLCanvasElement} */
    this.canvas = goog.dom.createDom("canvas", {width: width || 800, height: height || 450});

    /** @private */
    /** @type {CanvasRenderingContext2D} */
    this.ctx = this.canvas.getContext("2d");
    this.ctx.webkitImageSmoothingEnabled = smooth || false;
};

goog.inherits(rokko.components.DrawComponent, rokko.components.Component);

/** @inheritDoc */
rokko.components.DrawComponent.prototype.exec = function(entity, time){
    var img = entity.sprite.getImage();
    var el = img.getElement(time);
    var pos = img.getPos();
    var size = img.getSize();

    this.ctx.drawImage(el, pos.x, pos.y, size.w, size.h, entity.pos.x, entity.pos.y, entity.size.w || (size.w * entity.size.s), entity.size.h || (size.h * entity.size.s));

    // DEBUGGING;
    // TODO: Remove this whole thing altogether before deploying. Only conditionally removing it will definitely impact performance on final product
    this.ctx.strokeStyle = "#cc0000";
    this.ctx.beginPath();
    this.ctx.rect(entity.pos.x, entity.pos.y, entity.size.w || (size.w * entity.size.s), entity.size.h || (size.h * entity.size.s));
    this.ctx.stroke();
};

/** @inheritDoc */
rokko.components.DrawComponent.prototype.ID = "__DRAW_COMPONENT__";

rokko.components.DrawComponent.prototype.show = function(container){
    container.appendChild(this.canvas);
};

rokko.components.DrawComponent.prototype.clear = function(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};
