json.currentUser do
  json.(current_user, :id, :email)  # todo - first name, last name
  json.token session_token.token
end

json.app({})

json.dashboards current_user.dashboards do |dashboard|
  json.(dashboard, :id, :name, :description, :notes, :url, :target_users,
    :display_hero, :display_kpis, :published_at)
end

json.widgets current_user.widgets do |widget|
  json.(widget, :id, :dashboard_id, :row, :pos, :name, :type, :size, :units,
    :description, :options, :is_hero, :last_updated_at)
  json.datasets widget.dataset_widgets.collect {|dw| dw.dataset_id }
end

json.datasets current_user.datasets do |dataset|
  json.(dataset, :id, :name, :label, :units, :notes, :updated_at)
  json.datapoints dataset.datapoints.collect {|datapoint| datapoint.id }
end

json.datapoints current_user.datapoints do |datapoint|
  json.(datapoint, :id, :value, :label)
  json.ts datapoint.ts.to_formatted_s :data_point_serialisation
end

# json.organisations current_user.organisations do |organisation|
#   json.(organisation, :id, :name, :url, :description)
# end
