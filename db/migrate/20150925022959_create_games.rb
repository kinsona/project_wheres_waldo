class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :player_id
      t.integer :image_id
      t.datetime :start_time
      t.datetime :end_time

      t.timestamps null: false
    end
  end
end
