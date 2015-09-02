'use strict';

angular.module('stopWatchComplete', [])


  //You can see here that there is something happening with a variable called $interval
  //$interval is a built in 'service' available with angular, and it's going to be utilized
  //To create the stopwatch 'constructor'
  .controller('stopWatchController', function ($interval) {


    //vm here is short for 'view model'. This view model object is equivalent to the controller
    //that is references in the HTML. You COULD just use 'this' instead of assigning 'this' to vm,
    //however this starts to get complicated when you want to start using 'this' inside of
    //of functions. At this point I'll go over some important concepts
    var vm = this;

    var newTime = new Date();

    //Here you can see that I am using the 'new' keyword to assign a value onto my
    //stopWatch view property. new is used with constructors to specify that you want a new instance
    vm.stopWatch = new StopWatch(newTime);

    //#############################################################
    //Based off this codepen http://codepen.io/jhasselkus/pen/Efaxw
    //and this gist https://gist.github.com/electricg/4372563
    //#############################################################
    //This StopWatch constructor is handling all the logic that goes into creating a stopwatch
    //There are a few useful concepts inside of here I want to go over
    function StopWatch(time) {
      //First, you can see that we are passing in a value as an argument called time
      //time in this case is a new Date() object, you can see I declare it on the top level as newTime
      //it's used throughout to power the stop watch logic


      //here we have a few privately declared variables. What that means is that these variables
      //are not available outside of StopWatch constructor function, they are used strictly as the cogs
      //inside the stopWatch
      var totalElapsedMs = 0;
      var elapsedMs = 0;
      var startTime;
      var timerPromise;


      //This is very important. To avoid confusion, we are setting 'this' to a private variable
      //inside this function called self, to not confuse it with the 'this' we are using for binding to the view/vm
      //the 'this' we are seeing here essentially represents the the object we are constructing,
      //It is referring to the stopWatch instance itself. Where the 'this' we are using above represents
      //the -controller- itself. Which, is actually also a constructor
      var self = this;

      //Here you can see that we are using 'self' (which is the Stop Watch) and assigning it a function
      //called start.
      self.start = function () {
        if (!timerPromise) {
          startTime = new Date();
          timerPromise = $interval(function () {
            var now = new Date();
            elapsedMs = now.getTime() - startTime.getTime();
          }, 31);
        }
      };


      //Here, you can see that we are assigning a 'stop' function to the stop watch.
      self.stop = function () {
        if (timerPromise) {
          $interval.cancel(timerPromise);
          timerPromise = undefined;
          totalElapsedMs += elapsedMs;
          elapsedMs = 0;
        }
      };

      //And this is the reset function. You can see these three functions map to the three interactive actions
      //we have with our stop watch, but also, you notice that they are also being assigned to 'self'
      //this is an important point, as this makes them 'public' functions. Meaning that they can be accessed
      //external to this constructor. This is a complicated point, and I will go over it in more detail
      self.reset = function () {
        startTime = new Date();
        totalElapsedMs = elapsedMs = 0;
      };

      self.getElapsedMs = function () {
        return formatTime(totalElapsedMs + elapsedMs);
      };


      //This is a private function that handles the messy logic of formatting elapsed time in a human readable
      //format, ie - 00:00:25 vs something like 3423ms
      function formatTime(unformattedTime) {
        var h, m, s, ms = 0;
        var newTime = '';

        h = Math.floor(unformattedTime / (60 * 60 * 1000));
        unformattedTime = unformattedTime % (60 * 60 * 1000);
        m = Math.floor(unformattedTime / (60 * 1000));
        unformattedTime = unformattedTime % (60 * 1000);
        s = Math.floor(unformattedTime / 1000);
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
