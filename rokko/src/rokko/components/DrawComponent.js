goog.provide("rokko.components.DrawComponent");

goog.require("rokko.components.Component");
goog.require("goog.dom");

/**
 *
 * @constructor
 * @extends {rokko.components.Component}
 */
rokko.components.DrawComponent = function(width, height) {
    goog.base(this);

    /** @private */
    /** @type {HTMLCanvasElement} */
    this.canvas = goog.dom.createDom("canvas", {width: width || 800, height: height || 450});

    /** @private */
    /** @type {CanvasRenderingContext2D} */
    this.ctx = this.canvas.getContext("2d");
};

goog.inherits(rokko.components.DrawComponent, rokko.components.Component);

/** @inheritDoc */
rokko.components.DrawComponent.prototype.exec = function(entity){
    console.log(entity.sprite.img);
    this.ctx.drawImage(entity.sprite.img, entity.sprite.pos.x, entity.sprite.pos.y, entity.sprite.size.w, entity.sprite.size.h, entity.pos.x, entity.pos.y, entity.size.w, entity.size.h);
};

/** @inheritDoc */
rokko.components.DrawComponent.prototype.ID = "__DRAW_COMPONENT__";

rokko.components.DrawComponent.prototype.show = function(container){
    container.appendChild(this.canvas);
};

rokko.components.DrawComponent.prototype.clear = function(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};
