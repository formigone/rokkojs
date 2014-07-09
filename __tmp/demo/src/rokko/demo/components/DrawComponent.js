goog.provide("rokko.demo.components.DrawComponent");

goog.require("rokko.demo.components.Component");
goog.require("goog.dom");

rokko.demo.components.DrawComponent = function(width, height, isSmoothed) {
    goog.base(this);

    width = width || 800;
    height = height || 450;
    isSmoothed = isSmoothed || false;

    this.canvas = goog.dom.createDom("canvas", {width: width, height: height});
    this.ctx = this.canvas.getContext("2d");
    this.ctx.webkitImageSmoothingEnabled = isSmoothed;
};
goog.inherits(rokko.demo.components.DrawComponent, rokko.demo.components.Component);

rokko.demo.components.DrawComponent.prototype.ID = "DRAW_COMPONENT";

rokko.demo.components.DrawComponent.prototype.exec = function(entity) {
    var img = entity.getImage();
    var iPos = img.getPos();
    var iSize = img.getSize();
    var ePos = entity.getPos();
    var eSize = entity.getSize();

    this.ctx.drawImage(img.getImage(),
        iPos.x, iPos.y,
        iSize.width, iSize.height,
        ePos.x, ePos.y,
        eSize.width, eSize.height
    );
};

rokko.demo.components.DrawComponent.prototype.show = function(panel) {
    panel.appendChild(this.canvas);
};

rokko.demo.components.DrawComponent.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};
