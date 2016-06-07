class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.float :duration
      t.string :player_name

      t.timestamps null: false
    end
  end
end
