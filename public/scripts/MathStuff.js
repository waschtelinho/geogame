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