// Establish Base64 alphabet
var base64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

// Wrappers to make code more readable
var textToB64 = function(input) {return btoa(input);}
var b64ToText = function(input) {return atob(input);}

window.onload = function() {

	loadPage("events.content");

}


function decodeBase64String(input, mask) {

  // Rotate the base64 character to the left by a given character in the b64 mask
  // The character in the mask is incremented as you go
  // RETURNS BASE64 STRING!!!

  var out = "";

  for(var i = 0; i < input.length; i++) {

    var pos = base64.indexOf(input[i]) - base64.indexOf(mask[i % mask.length]);

    if(pos < 0) {

      pos = base64.length + pos;

    }

    out += base64[pos];

  }

  return out;

}

function encrypt(name, output, key) {

  fs.readFile(name, function(err, data) {

    if(err) throw err;

    fs.writeFile(output, encodeBase64String(textToB64(data.toString()), textToB64(key)), function (err) {

      if(err) throw err;

    });


  });

}

function unencrypt(string, validator, callback) {

  // Unencrypt base64 string, with plaintext passkey

	window.localStorage["passkey"] = window.localStorage["passkey"] || "help! I'm trapped in a callback factory!";

  var attempt = b64ToText(
		decodeBase64String(
			string,
			textToB64(window.localStorage["passkey"])
		)
	);

  let err = false;

	// Check if plaintext contains validator string
  if(attempt.indexOf(validator) == -1) {

    err = true;
    attempt == undefined;

  }

  callback(attempt, err);

}

function loadPage(src) {

	console.log("Loading page: " + src);

  $.get(src, function(data) {

    unencrypt(data, src, function(unencrypted, err) {

      if(err) {

        $("#mainPanel").load("login.html");

      } else {

        $("#mainPanel").html(unencrypted);

      }

    });

  });

}
