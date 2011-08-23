namespace :map do

  task :world => :environment do
    MapCreator.zooms.each do |zoom_factor|
      map_information = MapCreator.get_map_information(:en, zoom_factor)
      MapCreator.draw_map(map_information, '#00ff00', '#001aff', "public/images/worldmaps/world_#{zoom_factor}.gif")
      MapCreator.draw_map(map_information, '#00ff00', '#00ff00', "public/images/worldmaps/world_no_borders_#{zoom_factor}.gif")
    end
  end

end
