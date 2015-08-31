'use strict';

angular.module('stopWatchIndex', [])

.controller('mainController', function(){

    this.tableOfContents = [
      {
        label: 'Data Binding',
        url: 'dataBinding/dataBinding.html'
      }
    ];


    this.completeContents = [
      {
        label: 'Data Binding',
        url: 'dataBinding/dataBindingComplete/dataBinding.html'
      },{
        label: 'Stop Watch',
        url: 'stopWatch/stopWatchComplete/stopWatchComplete.html'
      }
    ];

  });