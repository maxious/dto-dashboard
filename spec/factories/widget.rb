FactoryGirl.define do
  factory :widget do
    dashboard
    sequence(:name) { |n| "widget-#{n}" }
    size      'medium'
    type      'bar'
    units     'n'
    row       0
    pos       0
    is_hero   false
    
    factory :widget_with_datasets do
      transient do
        datasets_count 1
      end

      after(:create) do |widget, evaluator|
        widget.datasets << create_list(:dataset_with_datapoints, evaluator.datasets_count)
        widget.save!
      end

      factory :widget_hero do
        is_hero true
      end
    end
  end
end
