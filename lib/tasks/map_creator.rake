namespace :map do
  
  zoom_factor = 6
  
  task :world => :environment do
    map_information = MapCreator.get_map_information('country_borders.txt', zoom_factor)
    MapCreator.draw_map(map_information, '#00ff00', '#001aff', 'public/images/world_b.gif')
    MapCreator.draw_map(map_information, '#00ff00', '#00ff00', 'public/images/world_no_borders_b.gif')
  end
  
  task :world => :environment do
    map_information = MapCreator.get_map_information('country_borders.txt', zoom_factor)
    country_list = (map_information[:countries].collect {|country| country[0]}).uniq!
    country_list.each do |country|
      
    end
    
    MapCreator.draw_map(map_information, '#00ff00', '#001aff', 'public/images/world_b.gif')
    MapCreator.draw_map(map_information, '#00ff00', '#00ff00', 'public/images/world_no_borders_b.gif')
  end
  
end