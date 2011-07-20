function CheckSuccess(clickX, clickY) {
	try {
		gr.clear();
	} catch (e) {}
	var success = false;
	var countries = clickedCountries(clickX, clickY);
	for (var i = 0; i < countries.length; i++) {
		MarkCountry(countries[i]);
		if (countries[i] == document.getElementById('country').value) {
			success = true;
		}
	}
	
	if (success) {
		alert('Richtig!');
		gr.clear();
		RandomCountry();
	} else {
		alert('Leider daneben! Das ist ' + countries);
	}
}

function clickedCountries(clickX, clickY) {
	var countries = [];
	infos = this.countryInfo[this.zoom]
	for (var name in infos) {
	  for (var i = 0; i < infos[name].length; i++) {
      var points = [];
      for (var j = 0; j < infos[name][i].length; j+= 2) {
        points.push({x: infos[name][i][j], y: infos[name][i][j + 1]});
      }
      
      if (isPointInPoly(points, {x: clickX, y: clickY})) {
  			countries.push(name)
  		}
    }
  }
	return countries;
}

function RandomCountry() {
  var random_country = this.countryList[Math.floor(Math.random() * this.countryList.length)];
  document.getElementById('country').value = random_country;
}

function SwitchMap() {
  if (document.getElementById('switch_map_link').innerHTML == 'Karte mit Grenzen anzeigen') {
    document.getElementById('switch_map_link').innerHTML = "Karte ohne Grenzen anzeigen";
    //document.getElementById('zoomer_image').src = "/images/world_b.gif";
    document.getElementById('thumbnail').src = "/images/world_s.gif";
  } else {
    document.getElementById('switch_map_link').innerHTML = "Karte mit Grenzen anzeigen";
    //document.getElementById('zoomer_image').src = "/images/world_no_borders_b.gif";
    document.getElementById('thumbnail').src = "/images/world_no_borders_s.gif";
  }
}

function ShowCountry() {
  gr.clear()
  MarkCountry(document.getElementById('country').value)
}

function MarkCountry(name) {
  gr = new jsGraphics(document.getElementById("bigmap"));

  //Create jsColor object
  var col = new jsColor("red");
  var info = this.countryInfo[this.zoom][name];
  for (var i = 0; i< info.length; i++) {
    var points = [];
    for (var j = 0; j< info[i].length; j+= 2) {
      points.push(new jsPoint(info[i][j], info[i][j + 1]));
    }
    try {
  		gr.fillPolygon(col, points);
  	} catch (e) {}
  }
}

function getX(el) {
	var x = parseInt(el.offsetLeft);
	if (!el.offsetParent) {
		return x;
	} else {
		return (x + getX(el.offsetParent));
	}
}

function getY(el) {
	var y = parseInt(el.offsetTop);
	if (!el.offsetParent) return y;
	else return (y + getY(el.offsetParent));
}

function ZoomIn(){
  if (this.zoom < 10) this.zoom += 1;
  this.imagezoom.setZoom(this.zoom);
}

function ZoomOut(){
  if (this.zoom > 2) this.zoom -= 1;
  this.imagezoom.setZoom(this.zoom);
}