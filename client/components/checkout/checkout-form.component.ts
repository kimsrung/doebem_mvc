const angular = require('angular');
const angularPayments = require('angular-payments');
// const ngRoute = require('angular-route');
// import routing from './cad-ong.routes';

export class CheckoutComponent {
  $mdDialog;
  dialog: Function;
  $http;
  $scope;
  checkoutForm: {};
  name;

  constructor($http, $scope, $animate, $mdDialog) {
    this.$http = $http;
    this.$scope = $scope;
    this.$mdDialog = $mdDialog;
  }

  // transform value into cents, the API only accepts cents
  transformToCents(value) {
    return value * 100;
  }

  addTransaction(form, ev) {    
    form.Payment.Amount = this.transformToCents(form.Payment.Amount);
    this.name = form.Customer.Name;
    console.log(form);
    console.log(this.$scope.checkoutForm);
    this.$http.post('/api/checkoutForm', form)
        .then(res => {
          this.showDialog();
          this.$scope.checkoutForm.$setPristine();
          console.log("After setPristine ");
          console.log(this.$scope.checkoutForm);
          this.$scope.checkoutForm.$setUntouched();
          console.log("After setUntouched ");
          console.log(this.$scope.checkoutForm);
          this.$scope.checkoutForm = {};
          console.log(this.$scope.checkoutForm);
        })        
    .catch(err => console.log(err));
  }

    showDialog() {
      this.dialog = this.$mdDialog.show({
        scope: this.$scope,
        preserveScope: true,
        controller: DialogController,
        templateUrl: 'dialogDonationMade.tmpl.pug',
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        fullscreen: this.$scope.customFullscreen // Only for -xs, -sm breakpoints.
      });
    }
  }

  function DialogController($scope, $mdDialog, $inject) {

    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }

  DialogController.$inject = ['$scope', '$mdDialog'];

export default angular.module('directives.checkoutForm', ['angularPayments', require('angular-input-masks')])
  .component('checkoutForm', {
    template: require('./checkout-form.pug'),
    controller: CheckoutComponent
  })
  .name;
