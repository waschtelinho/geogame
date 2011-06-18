require 'RMagick'

file = File.new("data/germany.txt", "r")
while (line = file.gets)
	a = line.split(' ').collect do |coords|
		coords.split(',')
	end
end
file.close
#puts a.inspect


canvas = Magick::Image.new(240, 300,
              Magick::HatchFill.new('white','lightcyan2'))
gc = Magick::Draw.new

gc.stroke('#001aff')
gc.stroke_width(3)
gc.fill('#00ff00')

x = 120
y = 32.5
gc.polygon(x,    y,     x+29, y+86,  x+109, y+86,
           x+47, y+140, x+73, y+226, x,     y+175,
           x-73, y+226, x-47, y+140, x-109, y+86,
           x-29, y+86)

gc.draw(canvas)
canvas.write('polygon.gif')
