var rokkoMap = angular.module("RokkoMap", []);

rokkoMap.controller("MenuController", function ($rootScope) {
   $rootScope.actions = [
      {name: "Map", children: [
         {id: "NEW", name: "New"},
         {id: "OPEN", name: "Open"},
         {id: "EXPORT", name: "Export"},
         {id: "SETTINGS", name: "Settings"}
      ]},
      {name: "Help", children: [
         {id: "ABOUT", name: "About Rokko Map"}
      ]}
   ];

   $rootScope.dispatchMenu = function (option) {
      $rootScope.$broadcast("MenuEvent", option);
   };
});

rokkoMap.controller("MapController", function ($scope) {
   $scope.isMouseDown = false;
   $scope.isActive = "";
   $scope.currBg = "";
   $scope.title = "No map selected";
   $scope.width = 0;
   $scope.height = 0;
   $scope.grid = {
      cells: [],
      cellWidth: 0,
      cellHeight: 0
   };

   $scope.initGrid = function () {
      $scope.title = "Creating new map...";

      // TODO: generate this size based on thumbanil size
      $scope.grid.cellWidth = 64;
      $scope.grid.cellHeight = 64;

      var grid = [];
      for (var i = 0, len = $scope.width * $scope.height; i < len; i++) {
         grid.push({
            bg: "transparent"
         });
      }

      $scope.grid.cells = grid;
      $scope.isActive = "active";
   };

   $scope.$on("MenuEvent", function (event, option) {
      switch (option) {
         case "NEW":
            $("#mapDialog").modal();
            break;
      }
   });

   $scope.$on("TileChangeEvent", function (event, style) {
      $scope.currBg = style;
   });

   $scope.setGrid = function($index, isClick) {
      if ($scope.isMouseDown || isClick) {
         $scope.grid.cells[$index].bg = $scope.currBg;
      }
   };

   $scope.setMouse = function(state) {
      $scope.isMouseDown = state;
   };
});

rokkoMap.controller("SettingsController", function ($rootScope) {
   $rootScope.tile = {
      width: 64,
      height: 64,
      margin: 0
   };

   $rootScope.frames = {
      pos: [],
      img: "",
      hor: 0,
      ver: 0,
      width: 0,
      height: 0,
      isActive: false
   };

   $rootScope.atlas = null;

   $rootScope.imgChange = function () {
      setTimeout(function () {
         var atlas = $("#tileSettingsPrivew img");

         if (atlas.length == 0) {
            return false;
         } else {
            atlas = atlas[0];
         }

         var imgWidth = atlas.width;
         var imgHeight = atlas.height;
         var halfMargin =  + parseInt($rootScope.tile.margin * 0.5);
         var tileWidth = $rootScope.tile.width + halfMargin;
         var tileHeight = $rootScope.tile.height + halfMargin;
         var pos = [];

         $rootScope.frames.hor = parseInt(imgWidth / tileWidth);
         $rootScope.frames.ver = parseInt(imgHeight / tileHeight);
         $rootScope.frames.img = atlas.src;

         var point;
         var x;
         var y;
         for (var i = 0, len = $rootScope.frames.ver * $rootScope.frames.hor; i < len; i++) {
            x = i * tileWidth % imgWidth;
            y = parseInt(i / $rootScope.frames.hor) * tileHeight;
            pos.push({
               bg: "url('" + $rootScope.frames.img + "') -" + x + "px -" + y + "px"
            });
         }

         $rootScope.atlas = atlas;
         $rootScope.frames.pos = pos;
         $rootScope.$digest();
      }, 10);
   };

   $rootScope.setTile = function($index) {
      for (var i = 0, len = $rootScope.frames.pos.length; i < len; i++) {
         $rootScope.frames.pos[i].isActive = false;
      }

      $rootScope.frames.pos[$index].isActive = ($rootScope.frames.pos[$index].isActive == "set") ? "" : "set";
      $rootScope.$broadcast("TileChangeEvent", $rootScope.frames.pos[$index].bg);
   };
});
