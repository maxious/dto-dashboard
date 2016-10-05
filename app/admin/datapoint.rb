ActiveAdmin.register Datapoint do
  permit_params :ts, :value

  belongs_to :dataset

  index do
    selectable_column
    column :ts
    column :value
    actions
  end

  filter :ts
  filter :value

  form do |f|
    f.inputs 'Dataset' do
      f.input :ts, :as => :string
      f.input :value, :as => :string
    end
    f.actions
  end

end
