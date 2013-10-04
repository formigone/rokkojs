goog.provide("rokko.factories.SpriteFactory");

goog.require("rokko.graphics.Sprite");
goog.require("rokko.graphics.SequencedImage");

/**
 *
 * @constructor
 */
rokko.factories.SpriteFactory = function(){
    /**
     * @private
     * @type {Object.<string, Object>}}
     */
    this.sprites = {};
};

/**
 *
 * @param {string} name
 * @param {string} url
 * @param Function(rokko.factories.SpriteFactory) callback
 * @param {boolean} override
 */
rokko.factories.SpriteFactory.prototype.loadFromJson = function(name, url, callback, override) {
};

/**
 *
 * @param {string} name
 * @throw Error if config file cannot built Sprite
 * @return {rokko.graphics.Sprite|null}
 */
rokko.factories.SpriteFactory.prototype.make = function(name) {
    return this.sprites[name] || null;
};
