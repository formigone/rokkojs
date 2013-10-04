goog.provide("rokko.factories.SpriteFactory");

goog.require("rokko.graphics.Sprite");
goog.require("rokko.graphics.SequencedImage");

goog.require("goog.net.XhrIo");

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
 * @param {Function} callback
 * @param {boolean=} override
 */
rokko.factories.SpriteFactory.prototype.loadFromJson = function(name, url, callback, override) {
    var self = this;
    goog.net.XhrIo.send(url, function(e){
        var xhr = /** @type {goog.net.XhrIo} */ (e.target);
        self.sprites[name] = JSON.parse(xhr.getResponseText());

        callback.call(self);
    });
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
