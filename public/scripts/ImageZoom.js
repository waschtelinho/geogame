var ImageZoom = new Class({
					   
	initialize: function(){
		this.zoomSize = 2; // x2 the size of the thumbnail
		
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
		
		this.bigMap = new Element('div', {
			id: 'bigmap',
			styles: {
				'width': thumb_size.x*this.zoomSize,
				'height': thumb_size.y*this.zoomSize,
				'left': '0px',
				'top': '0px',
				'position': 'absolute',
				'background-image': 'url(/images/world.gif)'
			},
			onclick: function(evt) {
			  CheckSuccess(evt.clientX - getX(document.getElementById('bigmap')), evt.clientY - getY(document.getElementById('bigmap')))
			}.bind(this)
		}).injectInside('zoomer_big_container');
		
		var ratioX = this.bigMap.width/thumb_size.x;
		var ratioY = this.bigMap.height/thumb_size.y;
		/* set the size of the zoomed area on thumbnail */
		var regionWidth = (thumb_size.x/ratioX).toInt()*this.zoomSize;
		var regionHeight = (thumb_size.y/ratioY).toInt()*this.zoomSize;				
		
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
				/* get the zoomed position on thumbnail */
				var pos = el.getPosition('zoomer_thumb');
				/* calculate where the zoomed image should be positioned */
				var calcLeft = -(pos.x*ratioX);
				var calcTop = -(pos.y*ratioY);
				/* set a few conditions in case the ratio between the thumbnail and the zoomed image is a float number */
				var bigImgLeft = this.bigMap.width - (thumb_size.x*this.zoomSize);
				var bigImgTop = this.bigMap.height - (thumb_size.y*this.zoomSize);						
				var left = (-calcLeft) > bigImgLeft ? -bigImgLeft : calcLeft;
				var top = (-calcTop) > bigImgTop ? -bigImgTop : calcTop;
				/* set the position of the zoomed image according to the position of the zoomed area on thumbnail */
				this.setPosition('zoomer_image',left,top);
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
	},
	
	getX: function(el) {
  	var x = parseInt(el.offsetLeft);
  	if (!el.offsetParent) {
  		return x;
  	} else {
  		return (x+getX(el.offsetParent));
  	}
  },

  getY: function(el) {
  	var y = parseInt(el.offsetTop);
  	if (!el.offsetParent) return y;
  	else return (y+getY(el.offsetParent));
  }

})

	
window.addEvent('domready', function(){
		new ImageZoom();
});
