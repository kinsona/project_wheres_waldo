class ImageCharacter < ActiveRecord::Base
  belongs_to :image
  belongs_to :character
end
