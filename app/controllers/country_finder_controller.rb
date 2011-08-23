require 'RMagick'

class CountryFinderController < ApplicationController

  def index
    @map_information = {}
    MapCreator.zooms.each do |zoom|
      @map_information[zoom] = MapCreator.get_map_information(:en, zoom)
    end
    @country_list = (@map_information[1][:countries].collect {|country| country[0]}).uniq!
  end

end
