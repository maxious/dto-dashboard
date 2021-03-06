FactoryGirl.define do
  factory :widget do
    dashboard
    sequence(:name) { |n| "widget-#{n}" }
    description       Faker::Lorem.sentence
    size              'medium'
    type              'bar'
    units             'n'
    row               0
    pos               0
    is_hero           false
    last_updated_at   { rand(100).hours.ago }

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
