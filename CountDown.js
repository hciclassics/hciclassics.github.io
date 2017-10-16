class CountDown {



  constructor(date, callback) {

    this.date = new Date(
      date.year      || date.years ||0,
      date.month - 1 || date.days || 0,
      date.day       || date.days || 0,
      date.hour      || date.hours || 0,
      date.minute    || date.minutes || 0,
      date.second    || date.seconds || 0);


    if(typeof(callback) == "function") {

      this.callback = callback;

    } else {

      this.target = callback;

      this.callback = function(vals) {

        var el = document.getElementById(this.target);

        if(vals) {

          el.innerHTML = "";


          el.innerHTML += vals.days;

          if(vals.days == 1) {

            el.innerHTML += " day, "

          } else {

            el.innerHTML += " days, "

          }

          el.innerHTML += vals.hours;

          if(vals.hours == 1) {

            el.innerHTML += " hour, "

          } else {

            el.innerHTML += " hours, "

          }

          el.innerHTML += vals.minutes;

          if(vals.minutes == 1) {

            el.innerHTML += " minute, "

          } else {

            el.innerHTML += " minutes, "

          }

          el.innerHTML += vals.seconds;

          if(vals.seconds == 1) {

            el.innerHTML += " second"

          } else {

            el.innerHTML += " seconds"

          }

        } else {

          el.innerHTML = "<span style='color: red;'>THE TIME HAS COME!!!</span>";

        }

      }

    }

    this.start();

  }

  start() {

    this.tick();

    var _this = this;

    this.interval = setInterval(function() {

      _this.tick();

    }, 1000);

  }

  tick() {

    let now = Date.now();
    let then = this.date.getTime();

    let seconds = (then - now) / 1000;

    if(seconds > 0) {

      let days = Math.floor(seconds / 86400);
      seconds -= days * 86400;

      let hours = Math.floor(seconds / 3600);
      seconds -= hours * 3600;

      let minutes = Math.floor(seconds / 60);
      seconds -= minutes * 60;

      seconds = Math.ceil(seconds);

      if(seconds == 60) {

        minutes ++;
        seconds = 0;

      }

      this.callback({

        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds

      });

    } else {

      this.callback(null);

    }

  }

}
