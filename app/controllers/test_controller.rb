require 'RMagick'

class TestController < ApplicationController

	def index
		@coordinates = get_coordinates
		#draw_coordinates(@coordinates)
	end
	
	private
		
		def get_coordinates
			zoom = 3
			file = File.new("country_borders.txt", "r")
			coordinates = []
			while (line = file.gets)
				name = line.chomp
				
				line = file.gets
				
				coords = []
				line.split(' ').each do |xyz|
					coords << ((xyz.split(',')[0].to_f + 200) * zoom).to_i
					coords << ((300 + (xyz.split(',')[1].to_f + 200) * -1) * zoom).to_i
				end
				
				file.gets
				
				coordinates << [name, coords]
			end
			file.close
			
			coordinates
		end
		
		def draw_coordinates(coordinates)
			canvas = Magick::Image.new(1200, 800,
						  Magick::HatchFill.new('white','lightcyan2'))
			gc = Magick::Draw.new

			gc.stroke('#001aff')
			gc.stroke_width(1)
			gc.fill('#00ff00')
			
			coordinates.each do |coords|
				gc.polygon(*coords[1])
			end
			
			gc.draw(canvas)
			canvas.write('public/images/world.gif')
		end
end
