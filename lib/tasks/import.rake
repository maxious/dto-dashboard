require 'json'

namespace :import do
  desc 'Imports Data'
  task data: :environment do

    orgs = %w(mygov dibp industry imports medicare-enrolment marketplace)

    ids = {
      'mygov' => 1,
      'dibp'  => 2,
      'industry' => 3,
      'imports' => 4,
      'medicare-enrolment' => 6,
      'marketplace' => 7
    }

    orgs.each do |name|

      puts "Importing: #{name}"

      file = File.read("lib/data/#{name}-data.json")
      data = JSON.parse(file)

      file = File.read("lib/data/#{name}-definition.json")
      definition = JSON.parse(file)

      organisation = Organisation.find_or_create_by!(:name => data['agency'], :url => data['url'])

      id = ids[name]
      dashboard = Dashboard.find_or_create_by!(:id => id, :name => definition['name'], :notes => definition['notes'], :organisation => organisation)
      dashboard.published_at = Time.now
      dashboard.save!

      datasets = {}

      data['datasets'].each do |dataset|
        units = dataset["units"] || 'n'
        dataset_model = Dataset.create!(
          :name => dataset['name'],
          :notes => dataset['note'],
          :organisation => organisation,
          :units => units)

        datasets[dataset['id']] = dataset_model

        # puts dataset['id']

        if dataset['data']

          dataset['data'].each do |data|
            ts = DateTime.strptime(data['label'], '%Y-%m')
            dataset_model.datapoints.create!(:ts => ts, :value => data['value'])
          end
        end
      end

      definition['widgets'].each do |widget|
        res = definition['layout'].collect.with_index { |a, row|
          [row, a.index(widget['id'])] if a.index(widget['id'])
        }.compact.flatten

        # this widget does not to be specified in the layout section (will not render it).
        # if we let it go further, it will break the database validation
        next if res.empty?

        # puts widget['id']
        description = widget['definition'].present? ? widget['definition'] : widget['description']
        is_hero = widget['is_hero'].present? ? widget['is_hero'] : false

        options = {}
        options['displayRoundedData'] = widget['displayRoundedData'] unless widget['displayRoundedData'].nil?
        options['stacking'] = widget['stacking'] if widget['stacking'].present?

        widget_model = Widget.create!(
          :dashboard => dashboard,
          :name => widget['name'],
          :description => description,
          :type => widget['type'],
          :size => widget['size'],
          :units => widget['units'],
          :is_hero => is_hero,
          :options => options,
          :row => res.first,
          :pos => res.last
        )

        if widget['datasets']
          widget['datasets'].each do |dataset_id|
            widget_model.datasets << datasets[dataset_id]
          end
          widget_model.save!
        end
      end
    end

  end
end
