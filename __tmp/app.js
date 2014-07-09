goog.provide("rokko.go");

goog.require("rokko.entities.Entity");
goog.require("rokko.graphics.Sprite");
goog.require("rokko.graphics.AnimatedSprite");
goog.require("rokko.graphics.Image");
goog.require("rokko.graphics.SequencedImage");
goog.require("rokko.graphics.Display");
goog.require("rokko.graphics.Renderer");
goog.require("rokko.components.MoveComponent");
goog.require("rokko.components.GameLoopComponent");
goog.require("rokko.factories.SpriteFactory");
goog.require("rokko.factories.EntityFactory");
goog.require("rokko.factories.MapFactory");

goog.require("goog.events.KeyHandler");
goog.require("goog.net.XhrIo");

function main() {

   var VIEW_HOR_TILES = 15;
   var VIEW_VER_TILES = 8;
   var TILE_WIDTH = 64;
   var TILE_HEIGHT = 64;

   var gameloop = new rokko.components.GameLoopComponent(60, {
      onDraw: function (time) {
         renderer.render(time);
      },
      onUpdate: function (time) {
         player.update();
      }
   });

   var canvas = new rokko.graphics.Display({
      x: 1,
      y: 0,
      width: VIEW_HOR_TILES,
      height: VIEW_VER_TILES
   },
   VIEW_HOR_TILES * TILE_WIDTH,
   VIEW_VER_TILES * TILE_HEIGHT);

   canvas.show(document.body);
   var renderer = new rokko.graphics.Renderer(canvas);

   /** @type rokko.entities.Entity */
   var player = null;
   var spriteFactory = new rokko.factories.SpriteFactory();
   var entityFactory = new rokko.factories.EntityFactory(spriteFactory);
   var mapFac = new rokko.factories.MapFactory();

   spriteFactory.loadFromJson("/config/megaman.sprites.json", function (spriteFactory) {
      entityFactory.loadFromJson("/config/megaman.entity.json", function (entFactory) {
         player = entFactory.make("megaman");

         var moveComp = new rokko.components.MoveComponent({
            onExec: function (entity) {

               // Cache property to avoid access lookup latency
               var comp = rokko.components.MoveComponent;

               if (this.keys[comp.KeyCode.KEY_RIGHT]) {
                  player.sprite.setSprite("running", true);
                  canvas.scrollViewBy(0.1, 0);
               } if (this.keys[comp.KeyCode.KEY_LEFT]) {
                  canvas.scrollViewBy(-0.1, 0);
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

         mapFac.loadFromJson("/config/simple.map.json?c=" + Math.random(), function(fac){
            var map = fac.make("simple-map");
            canvas.setMapSize(map.width, map.height);
            renderer.setMap(map);
            gameloop.exec(null);
         });
      });
   });
}

goog.exportSymbol("main", main);
