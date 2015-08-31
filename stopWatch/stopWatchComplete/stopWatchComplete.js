'use strict';

angular.module('stopWatchComplete', [])

.controller('stopWatchController', function($interval){


    var time = new Date();
    this.stopWatch = new StopWatch(time);


    //Based off this codepen http://codepen.io/jhasselkus/pen/Efaxw
    //and gist https://gist.github.com/electricg/4372563

    function StopWatch(time){
      var self = this;
      var totalElapsedMs = 0;
      var elapsedMs = 0;
      var startTime;
      var timerPromise;

      self.start = function() {
        if (!timerPromise) {
          startTime = new Date();
          timerPromise = $interval(function() {
            var now = new Date();
            elapsedMs = now.getTime() - startTime.getTime();
          }, 31);
        }
      };

      self.stop = function() {
        if (timerPromise) {
          $interval.cancel(timerPromise);
          timerPromise = undefined;
          totalElapsedMs += elapsedMs;
          elapsedMs = 0;
        }
      };

      self.reset = function() {
        startTime = new Date();
        totalElapsedMs = elapsedMs = 0;
      };

      self.getTime = function() {
        return time;
      };

      self.getElapsedMs = function() {
        return formatTime(totalElapsedMs + elapsedMs);
      };

      function formatTime(unformattedTime) {
        var h, m, s, ms = 0;
        var newTime = '';

        h = Math.floor( unformattedTime / (60 * 60 * 1000) );
        unformattedTime = unformattedTime % (60 * 60 * 1000);
        m = Math.floor( unformattedTime / (60 * 1000) );
        unformattedTime = unformattedTime % (60 * 1000);
        s = Math.floor( unformattedTime / 1000 );
        ms = unformattedTime % 1000;

        newTime = pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2) + ':' + pad(ms, 3);
        return newTime;
      }

      function pad(num, size) {
        var s = "0000" + num;
        return s.substr(s.length - size);
      }

    }

  });