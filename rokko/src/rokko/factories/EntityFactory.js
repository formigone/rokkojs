goog.provide("rokko.factories.EntityFactory");

goog.require("rokko.factories.SpriteFactory");

/**
 *
 * @param {rokko.factories.SpriteFactory} spriteFac
 * @constructor
 */
rokko.factories.EntityFactory = function (spriteFac) {
   this.spriteFac = spriteFac;
   this.entities = {};
};

rokko.factories.EntityFactory.prototype.getSpriteFactory = function () {
   return this.spriteFac;
};

/**
 *
 * @param {string} name
 * @param {string} url
 * @param {Function} callback
 * @param {boolean=} override
 */
rokko.factories.EntityFactory.prototype.loadFromJson = function (url, callback, override) {
   var self = this;

   goog.net.XhrIo.send(url, function (e) {
      var xhr = /** @type {goog.net.XhrIo} */ (e.target);
      var json = goog.json.parse(xhr.getResponseText());

      for (var i = 0, len = json.entities.length; i < len; i++) {
         self.entities[json.entities[i].name] = json.entities[i];
      }

      callback.call(null, self);
   });
};

/**
 *
 * @param {string} name
 * @throw Error if config file cannot built Sprite
 * @return {rokko.entities.Entity|null}
 */
rokko.factories.EntityFactory.prototype.make = function (name) {
   if (!goog.isDefAndNotNull(this.entities[name])) {
      return null;
   }

   var entity = this.entities[name];
   var sprites = {};

   for (var i = 0, len = entity.sprites.length; i < len; i++) {
      sprites[entity.sprites[i]] = this.spriteFac.make([entity.sprites[i]]);
   }

   return new rokko.entities.Entity(
      new rokko.math.Vec2(
         entity.entity.x,
         entity.entity.y
      ), {
         w: entity.entity.width,
         h: entity.entity.height,
         s: entity.entity.scale
      }, new rokko.graphics.AnimatedSprite({
            defaultFrame: entity.defFrame,
            sprites: sprites
         }
      )
   );
};
