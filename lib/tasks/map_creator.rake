namespace :map do
  
  task :world => :environment do
    map_information = MapCreator.get_map_information('country_borders.txt', 6)
    MapCreator.draw_map(map_information, '#00ff00', '#001aff', 'public/images/world_b.gif')
    MapCreator.draw_map(map_information, '#00ff00', '#00ff00', 'public/images/world_no_borders_b.gif')
  end
  
end