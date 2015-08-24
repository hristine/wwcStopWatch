'use strict';

angular.module('stopWatchIndex', [])

.controller('mainController', function(){

    this.tableOfContents = [
      {
        label: 'Data Binding',
        url: 'dataBinding/dataBinding.html'
      },
      {
        label: 'Click Event',
        url: 'clickevent'
      },
      {
        label: 'Repeating Lists',
        url: 'ngrepeat'
      }
    ];
  });