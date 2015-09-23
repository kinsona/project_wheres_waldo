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