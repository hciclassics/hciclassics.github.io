// Initialize default site variables

const defaultVals = {view: "events", info: "yes", article: "none"};
var vals = {view: "events", info: "yes", article: "none"};
resetvals();

// Site vals procedure:
// 1. Update value
// 2. Set query only when changing view, as it triggers a reload


// Set up encrypted data
var encryptedArray = [0, 26, 19, 47, 101, 82, 37, 6, 54, 6, 116, 63, 33, 63, 115, 83, 43, 59, 58, 51, 114, 22, 60, 35, 124, 82, 36, 58];
var encryptedString = "";

for(var i = 0; i < encryptedArray.length; i++) {

  encryptedString += String.fromCodePoint(encryptedArray[i]);

}

window.onload = function() {

  // Sets up page on load

  loadContent();

  // Optionally populate or remove info bar on right

  if(vals.info == "cheatmode") {

    $("#infoBar").html("<marquee>YOU ACTIVATED THE SPECIAL CHEATMODE ... IT DOES NOTHING!</marquee>");

  } else if(vals.info == "no") {

    $("#infoBar").parent().remove();

  } else {

    $("#infoBar").load("panels/infoPanel.html" + "?v=" + Math.floor(Math.random()*1000));

  }

}

function parseQuery(input) {

  // Extract data from URL query

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

  // Add data to URL as a query

  var base = window.location.href.split("?")[0] + "?";

  for(var key in vals) {

    // Only append to query if different from default, this keeps url clean and short
    if(vals.hasOwnProperty(key) && vals[key] != defaultVals[key]) {

      base += key + "=" + vals[key] + "&";

    }

  }

  base = base.substr(0, base.length - 1);

  window.location.href = base;

}

function resetvals() {

  // Set the site values to default, load fron default object
  for(var key in vals) {

    if(vals.hasOwnProperty(key)) {

      vals[key] = defaultVals[key];

    }

  }


}

function setView(name) {

  // Sets view name, updates URL query, thus reloading the page

  vals.view = name;
  setQuery(vals);

}

function loadContent() {

  // Loads main page content and collapses navbar

  if(Object.keys(parseQuery(window.location.href)).length > 0) { // There may be no query data, in which case retain default

    vals = parseQuery(window.location.href); // In case of linking from outside

  }

  contentName = vals.view;

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

function dismissInfo() {

  // Remove info bar and adjust site variables to keep it gone

  easeOutElement('infoPanel');
  vals.info = "no";

}

function easeOutElement(id) {

  // Sitewide method for removing elements, first slide it up, then remove from DOM
  $("#" + id).slideUp(200, function() {$(this).remove()});

}

function xorString(input, mask) {

  // Apply a XOR mask to a String

  var out = "";

  for(var i = 0; i < input.length; i++) {

    out += String.fromCodePoint(input.codePointAt(i) ^ mask.codePointAt(i % mask.length));

  }

  return out;

}
