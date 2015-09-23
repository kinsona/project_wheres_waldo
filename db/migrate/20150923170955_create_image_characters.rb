class CreateImageCharacters < ActiveRecord::Migration
  def change
    create_table :image_characters do |t|
      t.integer :image_id
      t.integer :character_id
      t.integer :x
      t.integer :y

      t.timestamps null: false
    end
  end
end
