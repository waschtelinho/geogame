function isPointInPoly(poly, pt){
	var intersections = [];
	for (var i = 0; i < poly.length - 1; i++) {
		var xs = intersection(poly[i].x, poly[i].y, poly[i+1].x, poly[i+1].y, pt.x, pt.y);
		if (xs == 100000) {	//point is on border
			return true;
		}
		if (xs != null) {
			intersections.push(xs);
		}
	}
	var xs = intersection(poly[poly.length-1].x, poly[poly.length-1].y, poly[0].x, poly[0].y, pt.x, pt.y);
	if (xs == 100000) {	//point is on border
		return true;
	}
	if (xs != null) {
		intersections.push(xs);
	}
	
	return ((intersections.length % 2) == 1);
}

function intersection(x1, y1, x2, y2, xp, yp) {
	var xs;
	var a2 = yp / xp;
	if (x1 == x2) {
		xs = x1;
	} else {
		var a1 = (y1 - y2) / (x1 - x2);
		var b1 = y1 - a1 * x1;
		
		if (a1 == a2) {
			if (b1 == 0 && xp >= Math.min(x1, x2) && xp <= Math.max(x1, x2)) {
				return 100000;	//point is on border
			}
			return null;
		}
		
		xs = (- b1) / (a1 - a2)
	}
	
	var ys = a2 * xs;
	if (isNaN(xs) || xs < Math.min(x1, x2) || xs > Math.max(x1, x2) || ys < Math.min(y1, y2) || ys > Math.max(y1, y2)  || xp < xs || yp < ys) {
		return null;
	}
		
	if (xp == xs && yp == ys) {
		return 100000;	//point is on border
	}
	
	//alert(x1 + ',' + y1 + ',' + x2 + ',' + y2 + ',' + xp + ',' + yp + ',' + a1 + ',' + b1 + ',' + a2 + ',' + xs  + ',' + ys);
	return xs;
}




function isPointInPoly(polygon, point, reference_point){
	var intersections = [];
	polygon.push(polygon[0]);
	
	for (var i = 0; i < polygon.length - 1; i++) {
	  var intersection = getIntersection(polygon[i].x, polygon[i].y, polygon[i+1].x, polygon[i+1].y, reference_point.x, reference_point.y, point.x, point.y);
	  
	  if (intersection == 'parallel') {
	    continue;
	  } else if (intersection == 'same') {
	    if (point.x >= Math.min(polygon[i].x, polygon[i+1].x) && point.x <= Math.max(polygon[i].x, polygon[i+1].x)) {
	      intersections = uniqueAdd(intersections, point);
	    }
	  } else {
	    var xs = Math.round(intersection.x);
	    var ys = Math.round(intersection.y);
	    if (xs >= Math.min(polygon[i].x, polygon[i+1].x) && xs <= Math.max(polygon[i].x, polygon[i+1].x) && ys >= Math.min(polygon[i].y, polygon[i+1].y) && ys <= Math.max(polygon[i].y, polygon[i+1].y) && point.x  >= xs && point.y >= ys) {
	      intersections = uniqueAdd(intersections, {x: xs, y: ys});
	    }
	  }
	}
	return ((intersections.length % 2) == 1);
}

function uniqueAdd(ar, point) {
  for (var i = 0; i < ar.length; i++) {
    if (ar[i].x == point.x && ar[i].y == point.y) {
      return ar;
    }
  }
  ar.push(point);
  return ar;
}

function getIntersection(l1x1, l1y1, l1x2, l1y2, l2x1, l2y1, l2x2, l2y2) {
  var a1, b1, a2, b2, xs, ys;
  if (l1x1 == l1x2) {
    a1 = null;
    b1 = null;
  } else {
    var a1 = (l1y1 - l1y2) / (l1x1 - l1x2);
  	var b1 = l1y1 - a1 * l1x1;
  }
  
  if (l2x1 == l2x2) {
    a2 = null;
    b2 = null;
  } else {
    var a2 = (l2y1 - l2y2) / (l2x1 - l2x2);
  	var b2 = l2y1 - a2 * l2x1;
  }
  
  if (a1 == a2) {
    if (l1x1 = l2x1) {
      return 'same';
    } else {
      return 'parallel';
    }
  }
  
  if (a1 == null) {
    xs = l1x1;
    ys = a2 * xs + b2;
  } else if (a2 == null) {
    xs = l2x1;
    ys = a1 * xs + b1;
  } else {
    xs = (b1 - b2) / (a2 - a1);
    ys = a2 * xs + b2;
  }
  
  return {x: xs, y: ys};
}
