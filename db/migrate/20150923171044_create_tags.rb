class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.integer :x
      t.integer :y
      t.integer :character_id
      t.integer :image_id
      t.integer :player_id

      t.timestamps null: false
    end
  end
end
