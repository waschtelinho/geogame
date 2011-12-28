# encoding : utf-8
require 'RMagick'

class MapCreator
  
  BORDERS_FILE_PATH = 'data/country_borders.txt'
  NAMES_FILE_PATH = 'data/country_names.txt'
  @@locale_names = nil

  def self.zooms
    [1,2,3,4,5,6,7,8,9,10]
  end

  def self.get_map_information(locale, zoom)
    file = File.new(BORDERS_FILE_PATH, "r")
    coordinates = []
    x_coords = []
    y_coords = []
    while (line = file.gets)
      name = get_loc_name(line.chomp, locale)
      #name = line.chomp

      line = file.gets

      coords = []
      line.split(' ').each do |xyz|
        x = ((xyz.split(',')[0].to_f + 200) * zoom).to_i
        y = ((300 + (xyz.split(',')[1].to_f + 200) * -1) * zoom).to_i
        unless coords[-2] == x && coords[-1] == y
          coords << x
          x_coords << x
          coords << y
          y_coords << y
        end
      end

      if coords.length > 2 && coords[1] == coords[-2] && coords[2] == coords[-1]
        x_coords.delete_at 0
        y_coords.delete_at 0
        coords.delete_at 0
        coords.delete_at 0
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
  
  def self.get_loc_name(country_key, locale)
    locale_names[country_key][locale]
  end

  def self.locale_names
    if @@locale_names.nil?
      @@locale_names = {}
      file = File.new(NAMES_FILE_PATH, "r")
      while (line = file.gets)
        names = line.split('|')
        @@locale_names[names[0]] = { :en => names[1], :de => names[2], :loc => names[3] }
      end
    end
    @@locale_names
  end
  
end
