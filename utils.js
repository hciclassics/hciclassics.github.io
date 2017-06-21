var encryptedArray = [88, 44, 31, 21, 70, 13, 77, 64, 22, 45, 89, 46, 14, 75, 82, 88, 13, 8, 30, 58, 30, 59, 4, 8, 26, 83, 16, 6, 4, 58, 31, 62, 4, 9, 81, 82, 16, 28, 93, 111, 114, 32, 33, 53, 80, 112, 11, 43, 43, 27, 87, 18, 49, 35, 81, 126, 54, 39, 30, 29, 126, 15, 45, 44, 80, 113, 55, 80, 7, 44, 64, 101, 24, 13, 84, 69, 11, 1, 21];
var encryptedString = "";

var siteVals = {view: "events", info: "yes"};

for(var i = 0; i < encryptedArray.length; i++) {

  encryptedString += String.fromCodePoint(encryptedArray[i]);

}

function parseQuery(input) {

  var x = {};
  var list = input.split("?")[1];

  if(!list) { // No query

    return {};

  }

  var vars = list.split("&");

  for(var i = 0; i < vars.length; i++) {

    var pair = vars[i].split("=");
    x[pair[0]] = pair[1];

  }

  return x;

}

function setQuery(vals) {

  var base = window.location.href.split("?")[0] + "?";

  for(var key in vals) {

    if(vals.hasOwnProperty(key)) {

      base += key + "=" + vals[key] + "&";

    }

  }

  base = base.substr(0, base.length - 1);

  window.location.href = base;

}

window.onload = function() {

  reloadContent();

  if(siteVals.info != "no") {

    $("#infoBar").load("panels/infoPanel.html" + "?v=" + Math.floor(Math.random()*1000));

  } else {

    $("#infoBar").parent().remove();

  }

}

function setView(name) {

  siteVals.view = name;
  setQuery(siteVals);
  reloadContent();

}

function reloadContent() {

  if(Object.keys(parseQuery(window.location.href)).length > 0) { // There may be no query data, in which case retain default

    siteVals = parseQuery(window.location.href); // In case of linking from outside

  }

  contentName = siteVals.view;

  // News page is default page
  contentURI = "panels/eventsPanel.html";

  if(contentName == "schedule") {

    contentURI = "panels/schedulePanel.html";

  } else if(contentName == "progress") {

    contentURI = "panels/progressPanel.html";

  } else if(contentName == "resources") {

    contentURI = "panels/resourcesPanel.html";

  } else if(contentName == "photos") {

    contentURI = "panels/photosPanel.html";

  }

  // '?v=' is a dirty trick to get around cacheing - add a query to the end of the filename when loading it
  $("#contentPanel").load(contentURI + "?v=" + Math.floor(Math.random()*1000));

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

    $("#resourcePasswordField").html("<a href='" + attempt + "' target='_blank'><button class='btn btn-primary'>Here you go!</button></a>");

  } else {

    $("#resourcePasswordField").parent().append("<div class='text-danger' style='padding: 5px;'><b>Incorrect password!</b></div>");

  }

}

function dismissInfo() {

  easeOutElement('infoPanel');
  siteVals.info = "no";

}
