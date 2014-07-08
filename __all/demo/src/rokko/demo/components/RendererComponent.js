goog.provide("rokko.demo.components.RendererComponent");

goog.require("rokko.demo.components.Component");

/**
 *
 * @param {rokko.demo.components.DrawComponent} drawComp
 * @constructor
 */
rokko.demo.components.RendererComponent = function(drawComp) {
    goog.base(this);

    this.drawComp = drawComp;
    this.entities = [];
};
goog.inherits(rokko.demo.components.RendererComponent, rokko.demo.components.Component);

rokko.demo.components.RendererComponent.prototype.ID = "RENDERER_COMPONENT";

rokko.demo.components.RendererComponent.prototype.exec = function() {
    for (var i = 0, len = this.entities.length; i < len; i++) {
        this.drawComp.exec(this.entities[i]);
    }
};

rokko.demo.components.RendererComponent.prototype.addEntity = function(entity) {
    this.entities.push(entity);
};
