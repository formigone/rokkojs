goog.provide("rokko.components.Component");

rokko.components.Component = function(){};

rokko.components.Component.prototype.exec = function(entity){
    console.log("Component exec...");
    console.log(" pos: (" + entity.pos.x + ", " + entity.pos.y + ")");
};

rokko.components.Component.prototype.ID = "ABSTRACT_COMPONENT";
