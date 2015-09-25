class Game < ActiveRecord::Base
  belongs_to :player
  belongs_to :image

  has_many :tags
  has_many :characters, :through => :image
end
