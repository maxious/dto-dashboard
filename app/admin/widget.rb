ActiveAdmin.register Widget do
  permit_params :name, :description, :row, :pos, :type, :size

  belongs_to :dashboard

  index do
    selectable_column
    column :name
    actions
  end

  filter :name

  form do |f|
    f.inputs 'Widget' do
      f.input :name, :as => :string
      f.input :description
    end
    f.actions
  end

end
