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

   $scope.atlas;
   $scope.tiles = [];

   $scope.imgChange = function() {
      setTimeout(function(){
         $scope.atlas = $("#tileSettingsPrivew img")[0];
         // TODO: calculate how many tiles in input image and update $scope.tiles with objects that can populate that list
      }, 500);
   };
});
