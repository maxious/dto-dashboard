class CreateDatasets < ActiveRecord::Migration[5.0]
  def change
    create_table :datasets do |t|
      t.references :organisation, :null => false
      t.text       :name, :null => false
      t.text       :units, :null => false
      t.timestamps
    end
  end
end
