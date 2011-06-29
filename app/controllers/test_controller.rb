require 'RMagick'

class TestController < ApplicationController

	def index
		@map_information = MapCreator.get_map_information('country_borders.txt', 3)
		@country_list = @map_information[:countries].collect {|country| country[0]}
	end
	
end
