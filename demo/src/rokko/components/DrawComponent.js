goog.provide("rokko.components.DrawComponent");

goog.require("rokko.components.Component");
goog.require("goog.dom");

rokko.components.DrawComponent = function(width, height, isSmoothed) {
    goog.base(this);

    width = width || 800;
    height = height || 450;
    isSmoothed = isSmoothed || false;

    this.canvas = goog.dom.createDom("canvas", {width: width, height: height});
    this.ctx = this.canvas.getContext("2d");
    this.ctx.webkitImageSmoothingEnabled = isSmoothed;
};
goog.inherits(rokko.components.DrawComponent, rokko.components.Component);

rokko.components.DrawComponent.prototype.ID = "DRAW_COMPONENT";

rokko.components.DrawComponent.prototype.exec = function(entity) {
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

rokko.components.DrawComponent.prototype.show = function(panel) {
    panel.appendChild(this.canvas);
};

rokko.components.DrawComponent.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};
