goog.provide("rokko.factories.SpriteFactory");

goog.require("rokko.graphics.Sprite");
goog.require("rokko.graphics.SequencedImage");
goog.require("rokko.math.Vec2");

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
rokko.factories.SpriteFactory.prototype.loadFromJson = function (url, callback, override) {
   var self = this;

   goog.net.XhrIo.send(url, function (e) {
      var xhr = /** @type {goog.net.XhrIo} */ (e.target);
      var json = xhr.getResponseJson();

      for (var i = 0, len = json["sprites"].length; i < len; i++) {
         var sprite = json["sprites"][i];

         var _frames = [];
         var _frame;
         for (var n = 0, nLen = sprite["frames"].length; n < nLen; n++) {
            _frame = sprite["frames"][n];

               _frames.push({
                  freq: _frame["freq"],
                  pos: {
                     x: _frame["pos"]["x"],
                     y: _frame["pos"]["y"]
                  },
                  size: {
                     w: _frame["size"]["w"],
                     h: _frame["size"]["h"]
                  }
            });
         }

         self.sprites[sprite["name"]] = {
            name: sprite["name"],
            img: sprite["img"],
            freq: sprite["freq"],
            currFrame: sprite["currFrame"],
            frames: _frames
         };
      }
      callback.call(null, self);
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

   var __sprite = {
      "name": "standing",
      "img": "/img/8bitmm.gif",
      "frames": [
         {
            "pos": {
               "x": 105,
               "y": 11
            },
            "size": {
               "w": 21,
               "h": 24
            },
            "freq": 1500
         }
         // ...
      ],
      "freq": 100,
      "currFrame": 0
   };

   var json = this.sprites[name];
   console.log("json: ", json);
   // NOTE: only need to litstr when referencing input file
//   var img = {};
//   img["frames"] = json["frames"];
//   img["freq"] = json["freq"];
//   img["currFrame"] = json["currFrame"];

   return new rokko.graphics.Sprite(
      new rokko.graphics.SequencedImage(json["img"], {
         frames: json["frames"],
         freq: json["freq"],
         currFrame: json["currFrame"]
      })
   );
};
