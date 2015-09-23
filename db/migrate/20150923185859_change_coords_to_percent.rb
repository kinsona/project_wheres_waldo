class ChangeCoordsToPercent < ActiveRecord::Migration
  def change
    change_column :tags, :x, :float
    change_column :tags, :y, :float
    change_column :image_characters, :x, :float
    change_column :image_characters, :y, :float
  end
end
