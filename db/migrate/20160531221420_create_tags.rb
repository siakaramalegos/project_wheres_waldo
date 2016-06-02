class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.float :top, null: false
      t.float :left, null: false
      t.string :character, null: false

      t.timestamps null: false
    end
  end
end
