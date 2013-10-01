goog.require("rokko.entities.Entity");
goog.require("rokko.components.DrawComponent");
goog.require("rokko.components.RendererComponent");
goog.require("rokko.graphics.Image");

function main() {
    var img = new rokko.graphics.Image("/demo/img/proto.gif", {x: 81, y: 13}, {width: 23, height: 24});

    var hero = new rokko.entities.Entity(
        img,
        {x: parseInt(Math.random() * 500), y: parseInt(Math.random() * 300)},
        {width: 23 * 7.5, height: 24 * 7.5}
    );

    var drawComp = new rokko.components.DrawComponent();
    drawComp.show(document.body);

    var renderer = new rokko.components.RendererComponent(drawComp);
    renderer.addEntity(hero);

    function renderGame() {
        renderer.exec();

        requestAnimationFrame(renderGame);
    }

    renderGame();
}
