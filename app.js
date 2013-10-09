goog.provide("rokko.go");

goog.require("rokko.entities.Entity");
goog.require("rokko.graphics.Sprite");
goog.require("rokko.graphics.AnimatedSprite");
goog.require("rokko.graphics.Image");
goog.require("rokko.graphics.SequencedImage");
goog.require("rokko.components.DrawComponent");
goog.require("rokko.components.RendererComponent");
goog.require("rokko.components.MoveComponent");
goog.require("rokko.factories.SpriteFactory");
goog.require("rokko.factories.EntityFactory");

goog.require("goog.events.KeyHandler");
goog.require("goog.net.XhrIo");

function main() {
    var canvas = new rokko.components.DrawComponent();
    var renderer = new rokko.components.RendererComponent(canvas);
    canvas.show(document.body);

    var mm = null;
    var spriteFactory = new rokko.factories.SpriteFactory();
    var entityFactory = new rokko.factories.EntityFactory(spriteFactory);

    spriteFactory.loadFromJson("/config/megaman.sprites.json", function (factory) {
        entityFactory.loadFromJson("/config/megaman.entity.json", function (factory) {
            mm = /** @type rokko.entities.Entity */ (factory.make("megaman"));

            var moveComp = new rokko.components.MoveComponent({
                onExec: function (self, entity) {
                    var comp = rokko.components.MoveComponent;

                    if (self.keys[comp.KeyCode.KEY_RIGHT]) {
                        mm.sprite.setSprite("running", true);
                    } else {
                        mm.sprite.setSprite("standing", true);
                    }

                    if (self.keys[comp.KeyCode.KEY_D]) {
                        canvas.setDebugMode(!canvas.isDebugMode());
                    }
                }
            });

            mm.addComponent(moveComp);
            renderer.addEntity(mm);
            _go(0);
        });
    });

    function _go(time) {
        mm.update();
        renderer.exec(time);
        requestAnimationFrame(_go);
    }
}

goog.exportSymbol("main", main);
