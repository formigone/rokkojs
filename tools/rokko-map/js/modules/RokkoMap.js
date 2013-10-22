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
   $scope.isActive = "";
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
         grid.push(i);
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
});

rokkoMap.controller("SettingsController", function ($scope) {
   $scope.tile = {
      width: 64,
      height: 64,
      margin: 0
   };

   $scope.frames = {
      pos: [],
      img: "",
      hor: 0,
      ver: 0,
      width: 0,
      height: 0,
      isActive: false
   };

   $scope.atlas = null;

   $scope.imgChange = function () {
      setTimeout(function () {
         var atlas = $("#tileSettingsPrivew img");

         if (atlas.length == 0) {
            return false;
         } else {
            atlas = atlas[0];
         }

         var imgWidth = atlas.width;
         var imgHeight = atlas.height;
         var halfMargin =  + parseInt($scope.tile.margin * 0.5);
         var tileWidth = $scope.tile.width + halfMargin;
         var tileHeight = $scope.tile.height + halfMargin;
         var pos = [];

         $scope.frames.hor = parseInt(imgWidth / tileWidth);
         $scope.frames.ver = parseInt(imgHeight / tileHeight);
         $scope.frames.img = atlas.src;

         var point;
         for (var i = 0, len = $scope.frames.ver * $scope.frames.hor; i < len; i++) {
            pos.push({
               x: i * tileWidth % imgWidth,
               y: parseInt(i / $scope.frames.hor) * tileHeight
            });
         }

         $scope.atlas = atlas;
         $scope.frames.pos = pos;
         $scope.$digest();
      }, 10);
   };

   $scope.setTile = function($index) {
      for (var i = 0, len = $scope.frames.pos.length; i < len; i++) {
         $scope.frames.pos[i].isActive = false;
      }

      $scope.frames.pos[$index].isActive = ($scope.frames.pos[$index].isActive == "set") ? "" : "set";
   };
});
