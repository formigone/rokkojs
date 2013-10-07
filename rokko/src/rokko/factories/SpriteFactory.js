goog.provide("rokko.factories.SpriteFactory");

goog.require("rokko.graphics.Sprite");
goog.require("rokko.graphics.SequencedImage");

goog.require("goog.net.XhrIo");

/**
 *
 * @constructor
 */
rokko.factories.SpriteFactory = function () {
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
rokko.factories.SpriteFactory.prototype.loadFromJson = function (name, url, callback, override) {
    var self = this;
    goog.net.XhrIo.send(url, function (e) {
        var xhr = /** @type {goog.net.XhrIo} */ (e.target);
        self.sprites[name] = goog.json.parse(xhr.getResponseText());

        callback.call(self);
    });
};

/**
 *
 * @param {string} name
 * @throw Error if config file cannot built Sprite
 * @return {rokko.graphics.Sprite|null}
 */
rokko.factories.SpriteFactory.prototype.make = function (name) {
    if (!goog.isDefAndNotNull(this.sprites[name])) {
        return null;
    }

    var json = this.sprites[name];

    return new rokko.graphics.Sprite(
        new rokko.graphics.SequencedImage(json.img, {
            frames: json.frames,
            freq: json.freq,
            currFrame: json.currFrame
        })
    );
};
