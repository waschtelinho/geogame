require 'RMagick'

class MapCreator

  #TODO gleiche Punkte nicht mit aufnehmen
  def self.get_map_information(source, zoom)
    file = File.new(source, "r")
    coordinates = []
    x_coords = []
    y_coords = []
    while (line = file.gets)
      name = line.chomp

      line = file.gets

      coords = []
      line.split(' ').each do |xyz|
        coords << ((xyz.split(',')[0].to_f + 200) * zoom).to_i
        x_coords << ((xyz.split(',')[0].to_f + 200) * zoom).to_i
        coords << ((300 + (xyz.split(',')[1].to_f + 200) * -1) * zoom).to_i
        y_coords << ((300 + (xyz.split(',')[1].to_f + 200) * -1) * zoom).to_i
      end

      file.gets

      coordinates << [name, coords]
    end
    file.close

    { 
      :countries => coordinates, 
      :x_min => x_coords.min, 
      :x_max => x_coords.max, 
      :y_min => y_coords.min, 
      :y_max => y_coords.max 
    }
  end

  def self.draw_map(map_information, color_fill, color_border, dest)
    canvas = Magick::Image.new(map_information[:x_max] + map_information[:x_min], map_information[:y_max] + map_information[:y_min])
    gc = Magick::Draw.new

    gc.stroke(color_border)
    gc.stroke_width(1)
    gc.fill(color_fill)

    map_information[:countries].each do |country|
      gc.polygon(*country[1])
    end

    gc.draw(canvas)
    canvas.write(dest)
  end
  
end
