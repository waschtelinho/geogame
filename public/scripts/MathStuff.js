function lineIntersectsWithPolygon(polygon, point, reference_point) {
	polygon.push(polygon[0]);
	
	for (var i = 0; i < polygon.length - 1; i++) {
	  var intersection = getIntersection(polygon[i].x, polygon[i].y, polygon[i+1].x, polygon[i+1].y, reference_point.x, reference_point.y, point.x, point.y);
	  
	  if (intersection == 'parallel') {
	    continue;
	  } else if (intersection == 'same') {
	    if (point.x >= Math.min(polygon[i].x, polygon[i+1].x) && point.x <= Math.max(polygon[i].x, polygon[i+1].x)) {
	      return true;
	    }
	  } else {
	    var xs = Math.round(intersection.x);
	    var ys = Math.round(intersection.y);
	    if (xs >= Math.min(polygon[i].x, polygon[i+1].x) && xs <= Math.max(polygon[i].x, polygon[i+1].x) && ys >= Math.min(polygon[i].y, polygon[i+1].y) && ys <= Math.max(polygon[i].y, polygon[i+1].y)) {
	      var xOk = ((point.x >= reference_point.x) && (point.x  >= xs)) || ((point.x <= reference_point.x) && (point.x  <= xs));
	      var yOk = ((point.y >= reference_point.y) && (point.y  >= ys)) || ((point.y <= reference_point.y) && (point.y  <= ys));
	      if (xOk && yOk) {
  	      return true;	        
	      }
	    }
	  }
	}
	return false
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

function getMidPoint(polygon) {
  var minX = null;
  var maxX = null;
  var minY = null;
  var maxY = null;
  for (var i = 0; i < polygon.length; i++) {
    if (minX == null || minX > polygon[i].x) {
      minX = polygon[i].x;
    }
    if (maxX == null || maxX < polygon[i].x) {
      maxX = polygon[i].x;
    }
    if (minY == null || minY > polygon[i].y) {
      minY = polygon[i].y;
    }
    if (maxY == null || maxY < polygon[i].y) {
      maxY = polygon[i].y;
    }
  }
  return {x: ((maxX - minX) / 2) + minX, y: ((maxY - minY) / 2) + minY}
}
