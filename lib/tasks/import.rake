require 'json'

namespace :import do
  desc 'Imports Data'
  task data: :environment do

    orgs = %w(dibp industry imports mygov)

    orgs.each do |name|

      puts "Importing: #{name}"

      file = File.read("lib/data/#{name}-data.json")
      data = JSON.parse(file)

      # check the data, if KPIs data are not set, we will add some default values in them
      kpiComponents = %w(user-satisfaction cost-per-transaction digital-take-up completion-rate)
      data['datasets'].each do |ds|
        if ds['data'] == nil && isKPI(ds['id'], kpiComponents)
            d = Hash.new
            d['label'] = Time.now.strftime('%Y-%m-')
            d['value'] =  0
            ds['data'] = [1]
            ds['data'][0] = d
        end
      end
      # puts "#{data}"

      file = File.read("lib/data/#{name}-definition.json")
      definition = JSON.parse(file)

      # check the definition layout section and make sure the KPIs are specified in it
      layout = definition['layout']

      if (layout[0]<=>["kpis"])==0 && (layout[1]<=>kpiComponents)==0 then
        # it is the layout what we need
      else
        # this layout is not in a correct form
        layoutKPI=[["kpis"], kpiComponents]
        for i in 0..layout.length-1
          if (layout[i] <=> ["kpis"]) != 0 && (layout[i]<=>kpiComponents) != 0 then
            layoutKPI.push(layout[i])
          end
        end
        definition['layout']=layoutKPI
      end
      # puts "#{definition['layout']}"

      organisation = Organisation.find_or_create_by!(:name => data['agency'], :url => data['url'])

      dashboard = Dashboard.find_or_create_by!(:name => definition['name'], :notes => definition['notes'], :organisation => organisation)
      dashboard.published_at = Time.now
      dashboard.save!

      datasets = {}

      data['datasets'].each do |dataset|
        units = dataset["units"] || 'n'
        dataset_model = Dataset.create!(:name => dataset['name'], :organisation => organisation, :units => units)

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
        res = definition['layout'].collect.with_index{ |a, row|
          [row, a.index(widget['id'])] if a.index(widget['id'])
        }.compact.flatten

        # puts widget['id']

        widget_model = Widget.create!(
          :dashboard => dashboard,
          :name => widget['name'],
          :description => widget['definition'] || widget['description'],
          :type => widget['type'],
          :size => widget['size'],
          :units => widget['units'],
          :row => res.first,
          :pos => res.last
        )

        if widget['datasets']
          widget['datasets'].each do |id|
            widget_model.datasets <<  datasets[id]
          end
          widget_model.save!
        end
      end
    end

  end

  def isKPI(kpiId, kpiComponents)
     for k in kpiComponents do
       if k==kpiId
         return true
       end
     end
      return false

  end

end
