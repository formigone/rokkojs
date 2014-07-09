goog.provide("rokko.demo.components.Component");

rokko.demo.components.Component = function(){};

rokko.demo.components.Component.prototype.exec = function(entity){
    console.log("Component exec...");
    console.log(" pos: (" + entity.pos.x + ", " + entity.pos.y + ")");
};

rokko.demo.components.Component.prototype.ID = "ABSTRACT_COMPONENT";
