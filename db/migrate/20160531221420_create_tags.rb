class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.integer :top, null: false
      t.integer :left, null: false
      t.string :character, null: false

      t.timestamps null: false
    end
  end
end
