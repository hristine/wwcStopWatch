'use strict';

angular.module('stopWatchIndex', [])

.controller('mainController', function(){

    this.tableOfContents = [
      {
        label: 'Data Binding',
        url: '1-DataBinding/dataBinding.html'
      },{
        label: 'Stop Watch',
        url: '2-stopWatch/stopWatch.html'
      }
    ];


    this.completeContents = [
      {
        label: 'Data Binding',
        url: '1-DataBinding/dataBindingComplete/dataBinding.html'
      },{
        label: 'Stop Watch',
        url: '2-stopWatch/stopWatchComplete/stopWatchComplete.html'
      }
    ];

  });