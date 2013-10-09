goog.provide("rokko.go");

goog.require("rokko.entities.Entity");
goog.require("rokko.graphics.Sprite");
goog.require("rokko.graphics.AnimatedSprite");
goog.require("rokko.graphics.Image");
goog.require("rokko.graphics.SequencedImage");
goog.require("rokko.components.DrawComponent");
goog.require("rokko.components.RendererComponent");
goog.require("rokko.factories.SpriteFactory");
goog.require("rokko.factories.EntityFactory");

goog.require("goog.events.KeyHandler");
goog.require("goog.net.XhrIo");

// TODO: implement way to override component methods per instance >> maybe a simple member assign through mutator does the trick??

function main() {
    var canvas = new rokko.components.DrawComponent();
    var renderer = new rokko.components.RendererComponent(canvas);
    canvas.show(document.body);

    var mm = null;
    var spriteFactory = new rokko.factories.SpriteFactory();
    var entityFactory = new rokko.factories.EntityFactory(spriteFactory);

    spriteFactory.loadFromJson("/config/megaman.sprites.json", function (factory) {
        entityFactory.loadFromJson("/config/megaman.entity.json", function (factory) {
            mm = factory.make("megaman");
            renderer.addEntity(mm);
            _go(0);
        });
    });

    function _go(time) {
        renderer.exec(time);
        requestAnimationFrame(_go);
    }

    function keyDown(e) {

        switch (e.keyCode) {
            case goog.events.KeyCodes.UP:
                e.preventDefault();
                if (e.shiftKey) {
                    mm.sprite.setSprite("spinning", true);
                } else {
                    mm.sprite.setSprite("jumping", true);
                }
                break;

            case goog.events.KeyCodes.RIGHT:
                e.preventDefault();
                if (e.shiftKey) {
                    mm.sprite.setSprite("running2", true);
                } else {
                    mm.sprite.setSprite("running", true);
                }
                break;

            case goog.events.KeyCodes.DOWN:
                e.preventDefault();
                mm.sprite.setSprite("standing", true);
                break;

            case goog.events.KeyCodes.D:
                e.preventDefault();
                canvas.setDebugMode(!canvas.isDebugMode());
                break;
        }
    };

    function keyUp(e) {
        var keyEvent = /** @type {goog.events.KeyEvent} */ (e);
        switch (keyEvent.keyCode) {
            case goog.events.KeyCodes.UP :
            case goog.events.KeyCodes.RIGHT:
                mm.sprite.setSprite("standing", true);
                break;
        }
    };

    goog.events.listen(document.body, goog.events.EventType.KEYDOWN, keyDown);
    goog.events.listen(document.body, goog.events.EventType.KEYUP, keyUp);
}

goog.exportSymbol("main", main);
