class Image < ActiveRecord::Base
  has_many :image_characters
  has_many :characters, :through => :image_characters

  has_many :games
end
