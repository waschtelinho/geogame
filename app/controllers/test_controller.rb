require 'RMagick'

class TestController < ApplicationController

	def index		
		draw_coordinates(get_coordinates)
	end
	
	private
		
		def get_coordinates
			file = File.new("/home/basti/Projekte/rails/geogame/country_borders.txt", "r")
			coordinates = []
			while (line = file.gets)
				name = line.chomp
				
				line = file.gets
				
				coords = []
				line.split(' ').each do |xyz|
					coords << ((xyz.split(',')[0].to_f + 200) * 2).to_i
					coords << ((400 + (xyz.split(',')[1].to_f + 200) * -1) * 2).to_i
				end
				
				file.gets
				
				coordinates << [name, coords]
			end
			file.close
			
			coordinates
		end
		
		def draw_coordinates(coordinates)
			canvas = Magick::Image.new(800, 800,
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
