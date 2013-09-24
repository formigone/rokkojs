goog.provide("rokko.components.RendererComponent");

goog.require("rokko.components.Component");
goog.require("goog.dom");

/**
 *
 * @constructor
 * @extends {rokko.components.Component}
 */
rokko.components.RendererComponent = function (drawComponent) {
    goog.base(this);

    /** @private */
    /** @type {rokko.components.DrawComponent} */
    this.drawComponent = drawComponent;

    /** @private */
    /** @type {rokko.entities.Entity} */
    this.entities = [];
};

goog.inherits(rokko.components.RendererComponent, rokko.components.Component);

/** @inheritDoc */
rokko.components.RendererComponent.prototype.exec = function (time) {
    this.drawComponent.clear();

    for (var i = 0, len = this.entities.length; i < len; i++) {
        this.drawComponent.exec(this.entities[i], time);
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
