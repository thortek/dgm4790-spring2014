'use strict';

var carApp = angular.module('carApp', []);

carApp.controller('EventController', 
     function EventController ($scope){
$scope.event = {
cars: [{
     manufacturer: 'Porsche',
     model: '911',
     price: 135000,
     wiki: 'http://en.wikipedia.org/wiki/Porsche_997'

 },{
     manufacturer: 'Nissan',
     model: 'GT-R',
     price: 80000,
     wiki:'http://en.wikipedia.org/wiki/Nissan_Gt-r'
 },{

     manufacturer: 'BMW',
     model: 'M3',
     price: 60500,
     wiki:'http://en.wikipedia.org/wiki/Bmw_m3'
 },{
     manufacturer: 'Audi',

     model: 'S5',
     price: 53000,
     wiki:'http://en.wikipedia.org/wiki/Audi_S5#Audi_S5'
 }]     
};
}     
);

