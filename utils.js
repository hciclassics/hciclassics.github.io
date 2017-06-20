var encryptedArray = [88, 44, 31, 21, 70, 13, 77, 64, 22, 45, 89, 46, 14, 75, 82, 88, 13, 8, 30, 58, 30, 59, 4, 8, 26, 83, 16, 6, 4, 58, 31, 62, 4, 9, 81, 82, 16, 28, 93, 111, 114, 32, 33, 53, 80, 112, 11, 43, 43, 27, 87, 18, 49, 35, 81, 126, 54, 39, 30, 29, 126, 15, 45, 44, 80, 113, 55, 80, 7, 44, 64, 101, 24, 13, 84, 69, 11, 1, 21];
var encryptedString = "";

for(var i = 0; i < encryptedArray.length; i++) {

  encryptedString += String.fromCodePoint(encryptedArray[i]);

}

function parseQuery(input) {

  var x = {};
  var list = input.split("?")[1];
  var vars = list.split("&");

  for(var i = 0; i < vars.length; i++) {

    var pair = vars[i].split("=");
    x[pair[0]] = pair[1];

  }

  return x;

}

window.onload = function() {

  loadContent("events");

  $("#infoBar").load("panels/infoPanel.html");

}

function loadContent(contentName) {

  if(contentName == "events") {

    $("#contentPanel").load("panels/eventsPanel.html");

  } else if(contentName == "schedule") {

    $("#contentPanel").load("panels/schedulePanel.html");

  } else if(contentName == "progress") {

    $("#contentPanel").load("panels/progressPanel.html");

  } else if(contentName == "resources") {

    $("#contentPanel").load("panels/resourcesPanel.html");

  } else if(contentName == "photos") {

    $("#contentPanel").load("panels/photosPanel.html");

  }

  $("#navbar-collapser").collapse("hide");

}

function easeOutElement(id) {

  $("#" + id).slideUp(200, function() {$(this).remove()});

}

function xorString(input, mask) {

  var out = "";

  for(var i = 0; i < input.length; i++) {

    out += String.fromCodePoint(input.codePointAt(i) ^ mask.codePointAt(i % mask.length));

  }

  return out;

}

function unencrypt() {

  var attempt = xorString(encryptedString, $("#passwordInput").val());

  // SPECIFIC CHECK, MAY NEED TO UPDATE
  if(attempt.indexOf("s/0Bx") != -1) {

    $("#resourcePasswordField").html("<a href='" + attempt + "'><button class='btn btn-primary'>Here you go!</button></a>");

  } else {

    $("#resourcePasswordField").parent().append("<div class='text-danger' style='padding: 5px;'><b>Incorrect password!</b></div>");

  }

}
