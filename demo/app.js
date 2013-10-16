goog.require("rokko.demo.entities.Entity");
goog.require("rokko.demo.components.DrawComponent");
goog.require("rokko.demo.components.RendererComponent");
goog.require("rokko.demo.graphics.Image");

function main() {
    var img = new rokko.demo.graphics.Image("/demo/img/proto.gif", {x: 81, y: 13}, {width: 23, height: 24});

    var hero = new rokko.demo.entities.Entity(
        img,
        {x: parseInt(Math.random() * 500), y: parseInt(Math.random() * 300)},
        {width: 23 * 7.5, height: 24 * 7.5}
    );

    var drawComp = new rokko.demo.components.DrawComponent();
    drawComp.show(document.body);

    var renderer = new rokko.demo.components.RendererComponent(drawComp);
    renderer.addEntity(hero);

    function renderGame() {
        renderer.exec();

        requestAnimationFrame(renderGame);
    }

    renderGame();
}
