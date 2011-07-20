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
	infos = countryInfo[zoom]
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
  var random_country = countryList[Math.floor(Math.random() * countryList.length)];
  document.getElementById('country').value = random_country;
}

function SwitchMap() {
  withBorders = !withBorders
  document.getElementById('thumbnail').src = getImageUrl(1, withBorders);
  document.getElementById('bigmap').setStyles({'background-image': 'url(' + getImageUrl(zoom, withBorders) + ')'});
}

function ShowCountry() {
  gr.clear()
  MarkCountry(document.getElementById('country').value)
}

function MarkCountry(name) {
  gr = new jsGraphics(document.getElementById("bigmap"));

  //Create jsColor object
  var col = new jsColor("red");
  var info = countryInfo[zoom][name];
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
  if (zoom < 10) zoom += 1;
  imagezoom.setZoom(zoom);
}

function ZoomOut(){
  if (zoom > 2) zoom -= 1;
  imagezoom.setZoom(zoom);
}

function getImageUrl(zoom, with_borders) {
  if (with_borders) {
    return '/images/worldmaps/world_' + zoom + '.gif'
  } else {
    return '/images/worldmaps/world_no_borders_' + zoom + '.gif'
  }
}