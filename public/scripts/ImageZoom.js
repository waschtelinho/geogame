var ImageZoom = new Class({
					   
	initialize: function(zoom){
		this.zoomSize = 2; // x2 the size of the thumbnail
		
		this.thumbnail = new Asset.image(getImageUrl(1, withBorders), {
			id:'thumbnail',
			onload: function(){
				$('zoomer_thumb').empty();
				this.thumbnail.inject('zoomer_thumb');
				this.generateZoomer( new Hash({ x:this.thumbnail.width , y:this.thumbnail.height }) );
				this.setZoom(zoom);
			}.bind(this)
		});
	},
	
	generateZoomer: function( thumb_size ){
		this.setDimensions('zoomer_thumb', thumb_size.x, thumb_size.y);
		this.setDimensions('zoomer_big_container', thumb_size.x * this.zoomSize, thumb_size.y * this.zoomSize);
		
		this.bigMap = new Element('div', {
			id: 'bigmap',
			styles: {
				'left': '0px',
				'top': '0px',
				'position': 'absolute'
			}
		}).injectInside('zoomer_big_container');
		this.bigMap.onclick = function(evt){CheckSuccess(evt.clientX - getX(document.getElementById('bigmap')), evt.clientY - getY(document.getElementById('bigmap')))}		
		
		this.zoomerRegion = new Element('div', {
			id: 'zoomer_region',
			styles: {'opacity': .7}
		}).injectInside('zoomer_thumb');
			
		this.drager = new Drag('zoomer_region', {
			modifiers: {x: 'left', y: 'top'},
			grid:1,
			onDrag: function(el){
				// get the zoomed position on thumbnail
				var pos = el.getPosition('zoomer_thumb');
				// calculate where the zoomed image should be positioned
				var calcLeft = -(pos.x * this.zoom);
				var calcTop = -(pos.y * this.zoom);
				// set a few conditions in case the ratio between the thumbnail and the zoomed image is a float number
				var bigImgLeft = this.bigMap.width - (thumb_size.x * this.zoomSize);
				var bigImgTop = this.bigMap.height - (thumb_size.y * this.zoomSize);						
				var left = (-calcLeft) > bigImgLeft ? -bigImgLeft : calcLeft;
				var top = (-calcTop) > bigImgTop ? -bigImgTop : calcTop;
				// set the position of the zoomed image according to the position of the zoomed area on thumbnail
				this.setPosition('bigmap', left, top);
			}.bind(this)
		});
	},
	
	setZoom: function(zoom) {
	  this.zoom = zoom;
	  this.bigMap.setStyles({
  	  'width': this.thumbnail.width * zoom,
  		'height': this.thumbnail.height * zoom,
  		'background-image': 'url(' + getImageUrl(zoom, withBorders) + ')'
	  });
	  
	  var regionWidth = (this.thumbnail.width / zoom).toInt() * this.zoomSize;
		var regionHeight = (this.thumbnail.height / zoom).toInt() * this.zoomSize;
	  this.zoomerRegion.setStyles({
  	  'width': regionWidth,
  		'height': regionHeight
		});
		
		this.drager.setOptions({
		  limit : {x : [0, (this.thumbnail.width - regionWidth)], y : [0, (this.thumbnail.height - regionHeight)]}
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
				'left':left,
				'top':top
			}
		})
	}
})
