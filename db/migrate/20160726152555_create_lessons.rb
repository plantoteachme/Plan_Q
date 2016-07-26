class CreateLessons < ActiveRecord::Migration
  def change
    create_table :lessons do |t|
      t.string :title
      t.string :description
      t.integer :author_id

      t.timestamps(null: false)
    end
  end
end