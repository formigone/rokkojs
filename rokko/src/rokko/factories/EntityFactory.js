goog.provide("rokko.factories.EntityFactory");

goog.require("rokko.factories.SpriteFactory");

/**
 *
 * @param {rokko.factories.SpriteFactory} spriteFac
 * @constructor
 */
rokko.factories.EntityFactory = function(spriteFac){
    this.spriteFac = spriteFac;
    this.entities = {};
};

rokko.factories.EntityFactory.prototype.getSpriteFactory = function() {
    return this.spriteFac;
};

/**
 *
 * @param {string} name
 * @param {string} url
 * @param {Function} callback
 * @param {boolean=} override
 */
rokko.factories.EntityFactory.prototype.loadFromJson = function(name, url, callback, override) {
    var self = this;
    goog.net.XhrIo.send(url, function(e){
        var xhr = /** @type {goog.net.XhrIo} */ (e.target);
        self.entities[name] = JSON.parse(xhr.getResponseText());

        callback.call(self);
    });
};

/**
 *
 * @param {string} name
 * @throw Error if config file cannot built Sprite
 * @return {rokko.entities.Entity|null}
 */
rokko.factories.EntityFactory.prototype.make = function(name) {
    if (!goog.isDefAndNotNull(this.entities[name])) {
        return null;
    }

    var entity = this.entities[name];
    var sprites = {};
    for (var i = 0, len = entity.sprites.length; i < len; i++) {
        sprites[i] = this.spriteFac.make([entity.sprites[i]]);
    }

    return new rokko.entities.Entity({
            x: entity.entity.x,
            y: entity.entity.y
        }, {
            w: entity.entity.width,
            h: entity.entity.height,
            s: entity.entity.scale
        }, new rokko.graphics.AnimatedSprite({
                defaultFrame: 0,
                sprites: sprites
            }
        )
    );
};
