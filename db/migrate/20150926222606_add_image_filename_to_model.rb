class AddImageFilenameToModel < ActiveRecord::Migration
  def change
    add_column :images, :filename, :string
  end
end
