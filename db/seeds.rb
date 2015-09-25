# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Image.delete_all
Character.delete_all
ImageCharacter.delete_all
Tag.delete_all
Player.delete_all



i = Image.new
i.name = "The Gobbling Gluttons"

i.save!


CHARACTERS = ["Waldo", "Wenda", "Odlaw", "Wizard Whitebeard", "Woof"]

CHARACTERS.each do |character_name|
  c = Character.new
  c.name = character_name
  c.images << i
  c.save!
end


p = Player.new
p.name = "Tester"
p.save!



# List of official answers for each character's location on each image

              #image name                   #char name
locations = { "The Gobbling Gluttons" =>  {
                                            "Waldo" => { x: 0.57096, y: 0.35195 },
                                            "Wenda" => { x: 0.39048, y: 0.32857 },
                                            "Odlaw" => { x: 0.40426, y: 0.60169 },
                                "Wizard Whitebeard" => { x: 0.85152, y: 0.84805 },
                                             "Woof" => { x: 0.68418, y: 0.61433 }
                                          }
            }



# Add X & Y coordinates to each ImageCharacter row based on the above hash
locations.each do |image_name, character_hash|

  image_id = Image.find_by_name(image_name).id

  character_hash.each do |character_name, coordinates|

    character_id = Character.find_by_name(character_name).id

    ic = ImageCharacter.where(:image_id => image_id, :character_id => character_id).first
    ic.x = coordinates[:x]
    ic.y = coordinates[:y]
    ic.save!
  end
end