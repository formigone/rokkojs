goog.provide("rokko.components.RendererComponent");

goog.require("rokko.components.Component");

/**
 *
 * @param {rokko.components.DrawComponent} drawComp
 * @constructor
 */
rokko.components.RendererComponent = function(drawComp) {
    goog.base(this);

    this.drawComp = drawComp;
    this.entities = [];
};
goog.inherits(rokko.components.RendererComponent, rokko.components.Component);

rokko.components.RendererComponent.prototype.ID = "RENDERER_COMPONENT";

rokko.components.RendererComponent.prototype.exec = function() {
    for (var i = 0, len = this.entities.length; i < len; i++) {
        this.drawComp.exec(this.entities[i]);
    }
};

rokko.components.RendererComponent.prototype.addEntity = function(entity) {
    this.entities.push(entity);
};
