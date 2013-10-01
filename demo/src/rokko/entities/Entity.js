goog.provide("rokko.entities.Entity");

/**
 *
 * @param {rokko.graphics.Image} img
 * @param pos
 * @param size
 * @constructor
 */
rokko.entities.Entity = function(img, pos, size) {
    this.img = img;
    this.pos = pos;
    this.size = size;

    this.components = {};
};

rokko.entities.Entity.prototype.addComponent = function(component) {
    this.components[component.ID] = component;
};

rokko.entities.Entity.prototype.removeComponent = function(component) {
    delete this.components[component.ID];
};

rokko.entities.Entity.prototype.removeComponentById = function(componentId) {
    delete this.components[componentId];
};

rokko.entities.Entity.prototype.getComponents = function() {
    return this.components;
};

rokko.entities.Entity.prototype.getImage = function() {
    return this.img;
};

rokko.entities.Entity.prototype.getPos = function() {
    return this.pos;
};

rokko.entities.Entity.prototype.getSize = function() {
    return this.size;
};

rokko.entities.Entity.prototype.findComponent = function(componentId) {
    return this.components[componentId] || null;
};

rokko.entities.Entity.prototype.update = function() {
    for (var comp in this.components) {
        this.components[comp].exec(this);
    }
};
