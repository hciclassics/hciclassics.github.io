window.onload = function() {

	loadPage("events.content");

}


function xorString(input, mask) {

  // Apply a XOR mask to a String

  var out = "";

  for(var i = 0; i < input.length; i++) {

    out += String.fromCodePoint(input.codePointAt(i) ^ mask.codePointAt(i % mask.length));

  }

  return out;

}

function unencrypt(string, validator, callback) {

  // Get inputted password, validate by checking to see if it unencrypts correctly

	window.localStorage["passkey"] = window.localStorage["passkey"] || "help! I'm trapped in a callback factory!";

  var attempt = xorString(string, window.localStorage["passkey"]);

  let err = false;

  if(attempt.indexOf(validator) == -1) {

    err = true;
    attempt == undefined;

  }

  callback(attempt, err);

}

function loadPage(src) {

  $.get(src, function(data) {

    unencrypt(data, src, function(data, err) {

      if(err) {

        $("#mainPanel").load("login.html");

      } else {

        $("#mainPanel").html(data);

      }

    });

  });

}
