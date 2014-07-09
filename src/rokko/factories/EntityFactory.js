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
 * Build a copy of what the input config file should look like at a minimum. Keep in mind that after compilation,
 * Closure will rename as many properties as it can. This means that properties from the config file referenced in
 * this function may break - the config file has a certain key, and the post-compilation code will likely have
 * a different one from what is specified in code. Thus, any attribute references in the config file must be
 * specified as literal strings (obj["my_key"] instead of obj.my_key).
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
      var json = xhr.getResponseJson();

      for (var i = 0, len = json["entities"].length; i < len; i++) {
         var entity = json["entities"][i];
         var _entity = {
            x: entity["entity"]["x"],
            y: entity["entity"]["y"],
            width: entity["entity"]["width"],
            height: entity["entity"]["height"],
            scale: entity["entity"]["scale"]
         };

         self.entities[entity["name"]] = {
            defFrame: entity["defFrame"],
            entity: _entity,
            sprites: entity["sprites"]
         };
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
      },
      new rokko.graphics.AnimatedSprite({
            defaultFrame: entity.defFrame,
            sprites: sprites
         }
      )
   );
};
