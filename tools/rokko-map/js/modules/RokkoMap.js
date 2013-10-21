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
   $scope.title = "No map selected";
   $scope.width = 0;
   $scope.height = 0;

   $scope.initGrid = function () {
      alert("?");
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
      width: 32,
      height: 32,
      margin: 10
   };

   $scope.atlas = null;
   $scope.frames = {
      pos: [],
      img: "",
      hor: 0,
      ver: 0,
      width: 0,
      height: 0
   };

   $scope.test = function(){
      if ($scope.atlas != null) {
         $scope.imgChange();
      }
   }

   $scope.imgChange = function () {
      setTimeout(function () {
         var atlas = $("#tileSettingsPrivew img")[0];
         var imgWidth = atlas.width;
         var imgHeight = atlas.height;
         var tileWidth = $scope.tile.width;
         var tileHeight = $scope.tile.height;
         var pos = [];
         $scope.frames.hor = parseInt(imgWidth / tileWidth);
         $scope.frames.ver = parseInt(imgHeight / tileHeight);

         $scope.frames.img = atlas.src;
         $scope.frames.pos = [];
         $scope.frames.width = $scope.frames.hor * 100;
         $scope.frames.height = $scope.frames.ver * 100;

         for (var i = 0, len = $scope.frames.ver * $scope.frames.hor; i < len; i++) {
            pos.push({
               x: (i * (tileWidth + $scope.tile.margin) % imgWidth),
               y: parseInt(i / $scope.frames.ver) * tileHeight
            });
         }

         $scope.atlas = atlas;
         $scope.frames.pos = pos;
         $scope.$digest();
      }, 500);
   };
});
