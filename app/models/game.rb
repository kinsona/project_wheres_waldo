class Game < ActiveRecord::Base
  belongs_to :player
  belongs_to :image

  has_many :tags
  has_many :characters, :through => :image


  def time
    if self.end_time
      (self.end_time - self.start_time).round(1)
    else
      nil
    end
  end


  def check_tags
    game_tags = self.tags
    characters = self.image.image_characters

    checks = characters.inject(true) do |correct, character|
      tag = game_tags.find_by_character_id(character.id)
      check_x = (tag.x - character.x).abs < 0.02
      check_y = (tag.y - character.y).abs < 0.02
      correct = check_x && check_y
    end

    return checks
  end


  def self.valid_scores(image_id)
    self.where( 'image_id = ?
                AND start_time IS NOT NULL
                AND end_time IS NOT NULL', image_id)
  end


  def self.fastest_times(image_id)
    results = self.valid_scores(image_id).sort_by(&:time).take(10)

    results.map do |game|
      {
        :game_id => game.id,
        :player_id => game.player.id,
        :name => game.player.name,
        :time => game.time
      }
    end
  end

end
