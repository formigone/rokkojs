goog.provide("rokko.factories.MapFactory");

goog.require("rokko.map.TileMap");
goog.require("goog.dom");

rokko.factories.MapFactory = function () {
   this.maps = {};
};

rokko.factories.MapFactory.prototype.loadFromJson = function (url, callback, override) {
   var self = this;

   goog.net.XhrIo.send(url, function (e) {
      var xhr = /** @type {goog.net.XhrIo} */ (e.target);
      var json = xhr.getResponseJson();

      for (var n = 0, nLen = json["maps"].length; n < nLen; n++) {
         var _tiles = [];
         var _tileObjs = {};

         for (var i = 0, len = json["maps"][n]["tileDict"].length; i < len; i++) {
            var _t = json["maps"][n]["tileDict"][i];

            _tileObjs[_t["key"]] = {
               texture: {
                  img: goog.dom.createDom("img", {src: _t["texture"]["img"]}),
                  x: _t["texture"]["x"],
                  y: _t["texture"]["y"],
                  width: _t["texture"]["width"],
                  height: _t["texture"]["height"]
               },
               code: rokko.map.TileMap.TileCode[_t["code"]]
            };
         }

         var _mapTiles = json["maps"][n]["tiles"];
         for (var i = 0, len = _mapTiles.length; i < len; i++) {
            _tiles.push(_tileObjs[_mapTiles[i]]);
         }

         self.maps[json["maps"][n]["name"]] = {
            width: json["maps"][n]["width"],
            height: json["maps"][n]["height"],
            tileWidth: json["maps"][n]["tileWidth"],
            tileHeight: json["maps"][n]["tileHeight"],
            tiles: _tiles
         };
      }

      callback.call(null, self);
   });
};

/**
 *
 * @param {string} name
 * @throw Error if config file cannot built Sprite
 * @return {rokko.map.TileMap|null}
 */
rokko.factories.MapFactory.prototype.make = function (name) {
   if (!goog.isDefAndNotNull(this.maps[name])) {
      return null;
   }

   return new rokko.map.TileMap(this.maps[name]);
};
