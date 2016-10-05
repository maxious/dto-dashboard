ActiveAdmin.register Dataset do
  permit_params :name, :label, :units, :notes

  sidebar 'Details', only: [:show, :edit] do
    ul do
      li link_to 'Datapoints', admin_dataset_datapoints_path(dataset)
    end
  end

  index do
    selectable_column
    column :name
    column :units
    column :dashboard
    column :datapoints do | dataset |
      dataset.datapoints.count
    end
    actions
  end

  filter :name
  filter :units
  filter :organisation

  form do |f|
    f.inputs 'Dataset' do
      f.input :name, :as => :string
      f.input :label, :as => :string
      f.input :units, :as => :select, :collection => %w(% $ n s i f)
      f.input :notes
    end
    f.actions
  end

end
