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
