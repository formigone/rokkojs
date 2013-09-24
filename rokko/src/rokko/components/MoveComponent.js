goog.provide("rokko.components.MoveComponent");

goog.require("rokko.components.Component");

/**
 *
 * @constructor
 * @extends {rokko.components.Component}
 */
rokko.components.MoveComponent = function() {
    goog.base(this);
};
goog.inherits(rokko.components.MoveComponent, rokko.components.Component);

/** @inheritDoc */
rokko.components.MoveComponent.prototype.exec = function(entity){};

/** @inheritDoc */
rokko.components.DrawComponent.prototype.ID = "__MOVE_COMPONENT__";
