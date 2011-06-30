namespace :map do
  
  task :world => :environment do
    map_information = MapCreator.get_map_information('country_borders.txt', 3)
    MapCreator.draw_map(map_information, '#00ff00', '#001aff', 'public/images/world.gif')
    MapCreator.draw_map(map_information, '#00ff00', '#00ff00', 'public/images/world_no_borders.gif')
  end
  
end