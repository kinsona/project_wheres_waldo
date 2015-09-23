class Tag < ActiveRecord::Base
  belongs_to :player
  belongs_to :image
  belongs_to :character
end
