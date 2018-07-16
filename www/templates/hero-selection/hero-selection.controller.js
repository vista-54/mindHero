;(function () {
    'use strict';

    angular.module('app')
        .controller('HeroSelectionController', HeroSelectionController);

    HeroSelectionController.$inject = ['$state', '$timeout', 'userService'];


    function HeroSelectionController($state, $timeout, userService) {
        const vm = this;

        vm.heroBG = heroBG;

        vm.heroes = [0,1,2,3,4,5,6,7];

        function heroBG(index) {
          if (index < 7) {
            return index
          } else {
            return 7
          }
        }
    }

})();
