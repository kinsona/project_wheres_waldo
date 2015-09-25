class ChangeTagsToExistOnGame < ActiveRecord::Migration
  def change
    remove_column :tags, :image_id
    add_column :tags, :game_id, :integer
  end
end
