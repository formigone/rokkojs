goog.provide("rokko.components.RendererComponent");

goog.require("rokko.components.Component");
goog.require("goog.dom");

/**
 *
 * @constructor
 * @extends {rokko.components.Component}
 */
rokko.components.RendererComponent = function (drawComponent, options) {
    goog.base(this, options);

    /** @private */
    /** @type {rokko.components.DrawComponent} */
    this.drawComponent = drawComponent;

    /** @private */
    /** @type {rokko.entities.Entity} */
    this.entities = [];

    /** @experimental */
    this.bwMode = false;
    this.wonlyMode = false;
};

goog.inherits(rokko.components.RendererComponent, rokko.components.Component);

/** @inheritDoc */
rokko.components.RendererComponent.prototype.exec = function (time) {
    this.drawComponent.clear();

    for (var i = 0, len = this.entities.length; i < len; i++) {
        this.drawComponent.exec(this.entities[i], time);
    }

    // Black & White mode - only set bits if alpha channel is not 0. Would be nice to do this with a fragment shader...
    if (this.bwMode) {
        var _canvas = this.drawComponent.canvas;
        var px = this.drawComponent.ctx.getImageData(0, 0, _canvas.width, _canvas.height);
        var data = px.data;
        for (var i = 0, len = data.length; i < len; i += 4) {
            data[i] = data[i + 1] = data[i + 2] = data[i + 3] == 255 ? 0 : 255;
        }
        this.drawComponent.ctx.putImageData(px, 0, 0);
    }

    if (this.wonlyMode) {
        var _canvas = this.drawComponent.canvas;
        var px = this.drawComponent.ctx.getImageData(0, 0, _canvas.width, _canvas.height);
        var data = px.data;
        for (var i = 0, len = data.length; i < len; i += 4) {
            data[i + 0] = data[i + 1] = data[i + 2] = data[i + 3] == 255 ? 200 : 0;
        }
        this.drawComponent.ctx.putImageData(px, 0, 0);
    }
};

/** @inheritDoc */
rokko.components.RendererComponent.prototype.ID = "__RENDERER_COMPONENT__";

/**
 *
 * @param {rokko.entities.Entity} entity
 */
rokko.components.RendererComponent.prototype.addEntity = function(entity) {
    this.entities.push(entity);
};
