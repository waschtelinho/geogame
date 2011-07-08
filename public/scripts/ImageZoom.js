var ImageZoom = new Class({
					   
	initialize: function(){
		this.zoomSize = 2; // x2 the size of the thumbnail
		this.zoom = 6;
		
		this.thumb_url = $('zoomer_thumb').getElement('a');
		this.thumb_image = this.thumb_url.getElement('img');
		
		this.thumbnail = new Asset.image( this.thumb_image.get('src'),{
			id:'thumbnail',
			onload: function(){
				$('zoomer_thumb').empty();
				this.thumbnail.inject('zoomer_thumb');
				this.generateZoomer( new Hash({ x:this.thumbnail.width , y:this.thumbnail.height }) );
			}.bind(this)
		});	
	},
	
	generateZoomer: function( thumb_size ){
		this.setDimensions('zoomer_thumb',thumb_size.x,thumb_size.y);
		this.setDimensions('zoomer_big_container',thumb_size.x*this.zoomSize,thumb_size.y*this.zoomSize);
		
		var bigMap = new Element('div', {
			id: 'bigmap',
			styles: {
				'width': thumb_size.x*this.zoom,
				'height': thumb_size.y*this.zoom,
				'left': '0px',
				'top': '0px',
				'position': 'absolute',
				'background-image': 'url(/images/world.gif)'
			}
		}).injectInside('zoomer_big_container');
		
		
		bigMap.onclick = function(evt){CheckSuccess(evt.clientX - getX(document.getElementById('bigmap')), evt.clientY - getY(document.getElementById('bigmap')))}
		
		/* set the size of the zoomed area on thumbnail */
		var regionWidth = (thumb_size.x/this.zoom).toInt()*this.zoomSize;
		var regionHeight = (thumb_size.y/this.zoom).toInt()*this.zoomSize;				
		
		new Element('div', {
			id: 'zoomer_region',
			styles: {
				'width': regionWidth,
				'height': regionHeight,
				'opacity': .7
			}
		}).injectInside('zoomer_thumb');
			
		new Drag('zoomer_region', {
			modifiers: {x: 'left', y: 'top'},
			grid:1,
			limit: {x:[0,(thumb_size.x - regionWidth)], y:[0, (thumb_size.y-regionHeight)]},
			onDrag: function(el){
				// get the zoomed position on thumbnail
				var pos = el.getPosition('zoomer_thumb');
				// calculate where the zoomed image should be positioned
				var calcLeft = -(pos.x*this.zoom);
				var calcTop = -(pos.y*this.zoom);
				// set a few conditions in case the ratio between the thumbnail and the zoomed image is a float number
				var bigImgLeft = bigMap.width - (thumb_size.x*this.zoomSize);
				var bigImgTop = bigMap.height - (thumb_size.y*this.zoomSize);						
				var left = (-calcLeft) > bigImgLeft ? -bigImgLeft : calcLeft;
				var top = (-calcTop) > bigImgTop ? -bigImgTop : calcTop;
				// set the position of the zoomed image according to the position of the zoomed area on thumbnail
				//this.setPosition('zoomer_image',left,top);
				this.setPosition('bigmap',left,top);
			}.bind(this)
		});
	},
	
	setDimensions: function(element,width,height){
		$(element).setStyles({
			'width':width,
			'height':height
		});
	},
	
	setPosition: function(element,left,top){
		$(element).set({
			styles:{
				'left': left,
				'top':top
			}
		})
	}

})

function getX(el) {
	var x = parseInt(el.offsetLeft);
	if (!el.offsetParent) {
		return x;
	} else {
		return (x+getX(el.offsetParent));
	}
}

function getY (el) {
	var y = parseInt(el.offsetTop);
	if (!el.offsetParent) return y;
	else return (y+getY(el.offsetParent));
}
	
window.addEvent('domready', function(){
		new ImageZoom();
});
