class CreateDatapoints < ActiveRecord::Migration[5.0]
  def change
    create_table :datapoints do |t|
      t.references  :dataset, :null => false
      t.timestamp   :ts, :null => false
      t.numeric     :value, :null => true
      t.timestamps
    end

    add_index :datapoints, :dataset_id

  end
end
