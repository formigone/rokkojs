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

/**
 *
 * TODO: Make DrawComponent and RendererComponent non-components
 *    since they have unique interfaces, which are both different from Component.
 *    Move them to /graphics/ and name them Display and Renderer respectively.
 *
 */
function main() {
   var canvas = new rokko.components.DrawComponent();
   var renderer = new rokko.components.RendererComponent(canvas);
   canvas.show(document.body);

   var player = null;
   var spriteFactory = new rokko.factories.SpriteFactory();
   var entityFactory = new rokko.factories.EntityFactory(spriteFactory);

   spriteFactory.loadFromJson("/config/megaman.sprites.json", function (factory) {
      entityFactory.loadFromJson("/config/megaman.entity.json", function (factory) {
         player = /** @type rokko.entities.Entity */ (factory.make("megaman"));

         var moveComp = new rokko.components.MoveComponent({
            onExec: function (entity) {

               // Cache property to avoid access lookup latency
               var comp = rokko.components.MoveComponent;

               if (this.keys[comp.KeyCode.KEY_RIGHT]) {
                  player.sprite.setSprite("running", true);
               } else {
                  player.sprite.setSprite("standing", true);
               }

               if (this.keys[comp.KeyCode.KEY_D]) {
                  canvas.setDebugMode(!canvas.isDebugMode());
               }
            }
         });

         player.addComponent(moveComp);
         renderer.addEntity(player);
         gameloop(0);
      });
   });

   function gameloop(time) {
      player.update();
      renderer.exec(time);
      requestAnimationFrame(gameloop);
   }
}

goog.exportSymbol("main", main);
