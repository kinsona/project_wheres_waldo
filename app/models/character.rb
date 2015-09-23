class Character < ActiveRecord::Base
  has_many :image_characters
  has_many :images, :through => :image_characters

  has_many :tags
end
