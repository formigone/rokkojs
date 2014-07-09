goog.provide("rokko.components.MoveComponent");

goog.require("rokko.components.Component");
goog.require("goog.events");

/**
 *
 * @constructor
 * @extends {rokko.components.Component}
 */
rokko.components.MoveComponent = function (options) {
    goog.base(this, options);
    this.keys = {};
};
goog.inherits(rokko.components.MoveComponent, rokko.components.Component);

// TODO: Complete this map
rokko.components.MoveComponent.KeyCode = {
    KEY_LEFT: 37,
    KEY_UP: 38,
    KEY_RIGHT: 39,
    KEY_DOWN: 40,
    KEY_A: 65,
    KEY_B: 66,
    KEY_C: 67,
    KEY_D: 68
};

/** @inheritDoc */
rokko.components.MoveComponent.prototype.exec = function (entity) {
};

/** @inheritDoc */
rokko.components.MoveComponent.prototype.ID = "__MOVE_COMPONENT__";

rokko.components.MoveComponent.prototype.keyUp = function (e) {
    this.keys[e.keyCode] = false;
};

rokko.components.MoveComponent.prototype.keyDown = function (e) {
    this.keys[e.keyCode] = true;
};

/** @inheritDoc */
rokko.components.MoveComponent.prototype.init = function () {
    goog.events.listen(document.body, goog.events.EventType.KEYDOWN, this.keyDown, false, this);
    goog.events.listen(document.body, goog.events.EventType.KEYUP, this.keyUp, false, this);
};
