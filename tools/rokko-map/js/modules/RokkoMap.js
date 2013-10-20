var rokkoMap = angular.module("RokkoMap", []);

rokkoMap.controller("MenuController", function ($rootScope) {
   $rootScope.actions = {
      File: [
         {id: "NEW", name: "New"},
         {id: "OPEN", name: "Open"},
         {id: "EXPORT", name: "Export"},
         {id: "SETTINGS", name: "Settings"}
      ],
      Help: [
         {id: "ABOUT", name: "About Rokko Map"}
      ]
   };

   $rootScope.dispatchMenu = function (option) {
      $rootScope.$broadcast("MenuEvent", option);
   };
});

rokkoMap.controller("MapController", function ($scope) {
   $scope.title = "No map selected";
   $scope.width = 0;
   $scope.height = 0;

   $scope.setGrid = function (x, y) {
      $scope.width = x;
      $scope.height = y;
   };

   $scope.$on("MenuEvent", function (event, option) {
      switch (option) {
         case "NEW":
            $scope.setGrid(23, 42);
            break;
      }
   });
});

rokkoMap.controller("SettingsController", function ($scope) {
   $scope.tile = {
      width: 32,
      height: 32,
      margin: 0
   };
});
