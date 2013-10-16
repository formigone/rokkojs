goog.provide("rokko.demo.entities.Entity");

/**
 *
 * @param {rokko.demo.graphics.Image} img
 * @param pos
 * @param size
 * @constructor
 */
rokko.demo.entities.Entity = function(img, pos, size) {
    this.img = img;
    this.pos = pos;
    this.size = size;

    this.components = {};
};

rokko.demo.entities.Entity.prototype.addComponent = function(component) {
    this.components[component.ID] = component;
};

rokko.demo.entities.Entity.prototype.removeComponent = function(component) {
    delete this.components[component.ID];
};

rokko.demo.entities.Entity.prototype.removeComponentById = function(componentId) {
    delete this.components[componentId];
};

rokko.demo.entities.Entity.prototype.getComponents = function() {
    return this.components;
};

rokko.demo.entities.Entity.prototype.getImage = function() {
    return this.img;
};

rokko.demo.entities.Entity.prototype.getPos = function() {
    return this.pos;
};

rokko.demo.entities.Entity.prototype.getSize = function() {
    return this.size;
};

rokko.demo.entities.Entity.prototype.findComponent = function(componentId) {
    return this.components[componentId] || null;
};

rokko.demo.entities.Entity.prototype.update = function() {
    for (var comp in this.components) {
        this.components[comp].exec(this);
    }
};
