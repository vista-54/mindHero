;(function () {
  'use strict';

  angular.module('app')
    .controller('PaymentController', PaymentController);

  PaymentController.$inject = ['$localStorage', '$state', '$scope', 'userService', '$timeout', '$ionicModal',
                                'kids'];


  function PaymentController($localStorage, $state, $scope, userService, $timeout, $ionicModal,
                             kids) {
    const vm = this;

    vm.toMenu = toMenu;

    vm.editKid = editKid;
    vm.kidColor = kidColor;
    vm.addKid = addKid;

    let  date = new Date();
    console.log("Time: ", date.getHours() + ' : ' + date.getMinutes());
    // console.log(date.toISOString());
    // console.log(date.toISOString().split('.')[0].split('T').join(' '));

    // vm.kids = kids;
    vm.kids = kidFilter();
    vm.totalPrice = totalPriceCalc(vm.kids.length);


    function kidFilter() {
      let maximum_kid = 6;
      let data = [];
      angular.forEach(kids, function (kid, index) {
        if (!kid.register && index <= maximum_kid ) { data.push(kid) }
      });
      return data;
    }

    function toMenu() {
      angular.forEach(vm.kids, function (kid) {
        let data = {
          kid_id: kid.id,
          register: 1,
          access: 1
        };
        userService.updateKid(data);
      });

      console.log('to menu');
      $timeout(function () { $state.go('menu'); }, 1500)
    }

    function editKid(kid) {
      for (let i = 0; i < kids.length; i++) {
        if ( kid.id === kids[i].id ) {
          $localStorage.kid_index = i;
          // delete $localStorage.outgoing_from_settings;
          $state.go('kid');
          break;
        }
      }
    }

    function addKid() {
      delete $localStorage.kid_index;
      // delete $localStorage.outgoing_from_settings;
      $state.go('kid');
    }

    function kidColor(index) {
      let name;
      index < 6 ? name = 'kid-color-' + index : name = 'kid-color-overflow';
      return name;
    }

    function totalPriceCalc(quantity) {
      if (quantity) {
        if (quantity > 1) {
          return 50*quantity + 50;
        } else {
          return 100;
        }
      } else {
        return 0;
      }
    }

    $ionicModal.fromTemplateUrl('payment-modal', {
      scope: $scope
    }).then(function (modal) {
      $scope.paymentModal = modal;
    });
  }
})();