function CheckSuccess(clickX, clickY) {
	var success = false;
	var countries = clickedCountries(clickX, clickY);
	GRAPHICS.clear();
	for (var i = 0; i < countries.length; i++) {
		MarkCountry(countries[i]);
		if (countries[i] == RANDOM_COUNTRY) {
			success = true;
		}
	}
	
	if (success) {
		alert('Richtig!');
    ClearMark();
		RandomCountry();
	} else {
		alert('Leider daneben! Das ist ' + countries);
	}
}

function clickedCountries(clickX, clickY) {
	var countries = [];
	infos = COUNTRY_INFO[ZOOM]
	for (var name in infos) {
	  for (var i = 0; i < infos[name].length; i++) {
      var points = [];
      for (var j = 0; j < infos[name][i].length; j+= 2) {
        points.push({x: infos[name][i][j], y: infos[name][i][j + 1]});
      }
      
      if (isPointInPoly(points, {x: clickX, y: clickY}, {x: 0, y: 0})) {
  			countries.push(name)
  		}
    }
  }
	return countries;
}

function RandomCountry() {
  ClearMark();
  RANDOM_COUNTRY = COUNTRY_LIST[Math.floor(Math.random() * COUNTRY_LIST.length)];
  document.getElementById('country').value = RANDOM_COUNTRY;
}

function SwitchMap() {
  WITH_BORDERS = !WITH_BORDERS
  document.getElementById('thumbnail').src = getImageUrl(1, WITH_BORDERS);
  document.getElementById('bigmap').setStyles({'background-image': 'url(' + getImageUrl(ZOOM, WITH_BORDERS) + ')'});
}

function ShowCountry() {
  MarkCountry(RANDOM_COUNTRY)
}

function MarkCountry(name) {
  if (name == null) {
    return;
  }

  MARKED_COUNTRY = name
  //Create jsColor object
  var col = new jsColor("red");
  var info = COUNTRY_INFO[ZOOM][name];
  for (var i = 0; i< info.length; i++) {
    var points = [];
    for (var j = 0; j< info[i].length; j+= 2) {
      points.push(new jsPoint(info[i][j], info[i][j + 1]));
    }
    try {
  		GRAPHICS.fillPolygon(col, points);
  	} catch (e) {}
  }
}

function ClearMark() {
  MARKED_COUNTRY = null;
  GRAPHICS.clear();
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
  if (ZOOM < 10) ZOOM += 1;
  IMAGE_ZOOM.setZoom(ZOOM);
  GRAPHICS.clear();
  MarkCountry(MARKED_COUNTRY);
}

function ZoomOut(){
  if (ZOOM > 2) ZOOM -= 1;
  IMAGE_ZOOM.setZoom(ZOOM);
  GRAPHICS.clear();
  MarkCountry(MARKED_COUNTRY);
}

function getImageUrl(zoom, with_borders) {
  if (with_borders) {
    return '/images/worldmaps/world_' + zoom + '.gif'
  } else {
    return '/images/worldmaps/world_no_borders_' + zoom + '.gif'
  }
}