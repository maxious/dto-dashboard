require 'rails_helper'

RSpec.describe Dataset, type: :model do

  it { is_expected.to belong_to :organisation }
  it { is_expected.to have_many :widgets }
  it { is_expected.to have_many :datapoints }
  it { is_expected.to have_many :dataset_widgets }

  it { is_expected.to validate_presence_of :name }

  context 'with no data' do
    subject(:dataset) { FactoryGirl.create(:dataset) }

    it              { is_expected.to_not have_data }
  end

  context 'with data' do
    subject(:dataset) { FactoryGirl.create(:dataset_with_datapoints) }
    it { is_expected.to have_data }
  end

  describe 'calculations' do

    let(:latest_value)    { 99 }
    let(:latest_ts)       { Time.now }

    let(:previous_value)  { 99 }
    let(:previous_ts)     { 1.month.ago }

    subject!(:dataset) { FactoryGirl.create(:dataset) }

    let!(:latest)      { FactoryGirl.create(:datapoint, :dataset => dataset, :ts => latest_ts, :value => latest_value) }
    let!(:previous)    { FactoryGirl.create(:datapoint, :dataset => dataset, :ts => previous_ts, :value => previous_value) }

    its(:latest)    { is_expected.to eq latest }
    its(:previous)  { is_expected.to eq previous }

    context 'up' do
      let(:latest_value)    { 100 }
      let(:previous_value)  { 50 }

      it { is_expected.to be_trending }
      it { is_expected.to be_up }
      it { is_expected.to_not be_down }

      its(:difference)  { is_expected.to eq 50 }
      its(:trend)       { is_expected.to eq 'up' }
    end

    context 'down' do
      let(:latest_value)    { 42 }
      let(:previous_value)  { 99 }

      it { is_expected.to be_trending }
      it { is_expected.to be_down }
      it { is_expected.to_not be_up }

      its(:difference)  { is_expected.to eq -57 }
      its(:trend)       { is_expected.to eq 'down' }
    end

    context 'unchanged' do
      let(:latest_value)    { 42 }
      let(:previous_value)  { 42 }

      it { is_expected.to_not be_trending }
      it { is_expected.to be_down }
      it { is_expected.to_not be_up }

      its(:difference)  { is_expected.to eq 0 }
      its(:trend)       { is_expected.to eq 'unchanged' }
    end


    # describe '.summary' do
    #   let(:widget) { FactoryGirl.create(:widget_with_datasets) }
    #   let(:latest) { Datapoint.by_time.last }
    #   it { expect(widget.latest).to eq latest }
    # end
  end

  describe 'measurable' do
    let(:unit)        { 'n' }
    subject(:dataset) { FactoryGirl.create(:dataset, :units => unit) }

    its(:prefix) { is_expected.to eq ''}
    its(:suffix) { is_expected.to eq ''}

    describe '$' do
      let(:unit) { '$' }

      it { is_expected.to be_money }

      its(:prefix) { is_expected.to eq '$'}
      its(:suffix) { is_expected.to eq ''}
    end

    describe '%' do
      let(:unit) { '%' }

      it { is_expected.to be_percentage }

      its(:prefix) { is_expected.to eq ''}
      its(:suffix) { is_expected.to eq '%'}
    end
  end

end
