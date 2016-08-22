require 'rails_helper'

RSpec.describe WidgetDecorator, type: :decorator do
 
  let(:latest_value)    { 99 }
  let(:latest_ts)       { Date.parse('2020-02-01') }

  let(:previous_value)  { 99 }
  let(:previous_ts)     { Date.parse('2020-01-01') }

  let(:unit)            { 's' }

  let(:widget)      { FactoryGirl.create(:widget) }
  let(:dataset)     { FactoryGirl.create(:dataset, :units => unit) }

  let!(:latest)     { FactoryGirl.create(:datapoint, :dataset => dataset, :ts => latest_ts, :value => latest_value) }
  let!(:previous)   { FactoryGirl.create(:datapoint, :dataset => dataset, :ts => previous_ts, :value => previous_value) }

  before {
    widget.datasets << dataset
    widget.save!
  }

  subject { widget.decorate }

  its(:summary) { is_expected.to eq '' }

  describe 'rendering data for charts' do

    let(:widget)  { FactoryGirl.create(:widget_with_datasets) }

    subject(:chart)   { widget.decorate.to_chart }

    it { should include("summary") }
    it { should include("id") }
    it { should include("latest") }
    it { should include("suffix") }

    {
    	"suffix": "%",
    	"latest": {
    		"label": "2016-06",
    		"value": 97
    	},
    	"change": 7,
    	"summary": "Up by undefined7.0% since 2016-05",
    	"id": "user-satisfaction",
    	"name": "User Satisfaction",
    	"size": "extra-small",
    	"type": "kpi-sparkline",
    	"units": "%",
    	"datasets": [{
    		"id": "user-satisfaction",
    		"data": [{
    			"label": "2016-03",
    			"value": 99
    		}, {
    			"label": "2016-04",
    			"value": 95
    		}, {
    			"label": "2016-05",
    			"value": 90
    		}, {
    			"label": "2016-06",
    			"value": 97
    		}],
    		"name": "User satisfaction",
    		"note": "",
    		"color": "#f0f0f0",
    		"units": "",
    		"recorded_at": "2016-06-30T01:01:01.111Z"
    	}],
    	"updated_at": "2016-06-30T01:01:01.111Z",
    	"description": "Overall satisfaction score includes all ratings weighted from 100% for very satisfied to 0% for very dissatisfied"
    }


  end


  describe 'up' do

    context 'decimal' do
      let(:latest_value)    { 100 }
      let(:previous_value)  { 50 }

      context '$' do
        let(:unit)    { '$' }
        its(:summary) { is_expected.to eq 'Up by $50.00 since Jan 2020' }
      end

      context 's' do
        let(:unit)    { '%' }
        its(:summary) { is_expected.to eq 'Up by 50.00% since Jan 2020' }
      end

      context 'i' do
        let(:unit)    { 'i' }
        its(:summary) { is_expected.to eq 'Up by 50 since Jan 2020' }
      end
    end

    context 'decimal' do
      let(:latest_value)    { 100 }
      let(:previous_value)  { 50.50 }

      context '$' do
        let(:unit)    { '$' }
        its(:summary) { is_expected.to eq 'Up by $49.50 since Jan 2020' }
      end

      context 's' do
        let(:unit)    { '%' }
        its(:summary) { is_expected.to eq 'Up by 49.50% since Jan 2020' }
      end
    end
  end

  describe 'down' do

    context 'decimal' do
      let(:latest_value)    { 50 }
      let(:previous_value)  { 100 }

      context '$' do
        let(:unit)    { '$' }
        its(:summary) { is_expected.to eq 'Down by $50.00 since Jan 2020' }
      end

      context 's' do
        let(:unit)    { '%' }
        its(:summary) { is_expected.to eq 'Down by 50.00% since Jan 2020' }
      end

      context 'i' do
        let(:unit)    { 'i' }
        its(:summary) { is_expected.to eq 'Down by 50 since Jan 2020' }
      end
    end

    context 'decimal' do
      let(:latest_value)    { 50.50 }
      let(:previous_value)  { 100 }

      context '$' do
        let(:unit)    { '$' }
        its(:summary) { is_expected.to eq 'Down by $49.50 since Jan 2020' }
      end

      context 's' do
        let(:unit)    { '%' }
        its(:summary) { is_expected.to eq 'Down by 49.50% since Jan 2020' }
      end
    end
  end


  describe 'unchanged' do

    let(:latest_value)    { 100 }
    let(:previous_value)  { 100 }

    context '$' do
      let(:unit)    { '$' }
      its(:summary) { is_expected.to eq 'Unchanged since Jan 2020' }
    end

    context 's' do
      let(:unit)    { '%' }
      its(:summary) { is_expected.to eq 'Unchanged since Jan 2020' }
    end

    context 'i' do
      let(:unit)    { 'i' }
      its(:summary) { is_expected.to eq 'Unchanged since Jan 2020' }
    end
  end
end
