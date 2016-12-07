const angular = require('angular');
const ngRoute = require('angular-route');
// const jkAngularCarousel = require('../../../node_modules/angular-jk-carousel/dist/jk-carousel.js');
import routing from './pag-ongs.routes';
import contactForm from '../../components/contact-form/contact-form.component';

export class PagOngs {
  $http;
  $scope;
  $routeParams;
  stepOptions = [];
  listOng = [];
  pageTitle;
  pageImage;
  infoOng;
  slug;

  /*@ngInject*/
  constructor($http, $scope, socket, $routeParams) {
    this.$http = $http;
    this.$scope = $scope;
    this.$routeParams = $routeParams;
    this.pageTitle;
    this.pageImage;
    this.infoOng;
    this.slug;



    
}

 carregaLista() {
   var slug = this.$routeParams.slug;
   console.log(slug);
  //  this.$http.get('api/ong')
  //     .then(res => {

  //       this.$scope = res.data.findOne({'slug' : ''});

  //     });

    this.$http.get('api/ong', function(req, res, next){
       res.findOne({'author' : slug} , function (err, doc){
        if (err) return next(err);
        if (!doc) return next(new Error('cant find'));
        console.log(doc);
        this.$scope = res.json(doc);
       });

    })
    
  }

  $onInit(){
     this.carregaLista();
     console.log(this.$routeParams);
     console.log(this.$scope);
  }

}

export default angular.module('doebemOrgApp.pagOngs', [ngRoute, contactForm]) 
  .config(routing) 
  .component('pagOngs', {template: require('./pag-ongs.pug'), controller: PagOngs})
  .name;

// 'jkAngularCarousel'