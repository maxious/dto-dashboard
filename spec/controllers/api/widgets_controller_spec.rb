require 'rails_helper'

RSpec.describe Api::V1::WidgetsController, :type => :controller do
  include_context 'api_schema'

  describe '#index' do

    context 'when unauthorised' do
      before { get :index, :params => { :dashboard_id => 999 } }
      include_examples 'api_unauthorized_examples'
    end

    context 'when authorised' do
      include_context 'api_authorisation'

      context 'with unowned dashboard' do
        let(:other) { FactoryGirl.create(:dashboard_with_widgets) }

        before { get :index, :params => { :dashboard_id => other.id } }
        it { expect(response).to have_http_status(404) }
      end

      context 'with dashboard' do

        let(:schema)  { widgets_schema }

        before { get :index, :params => { :dashboard_id => dashboard.id } }

        include_examples 'api_authorized_ok'
      end
    end

  end


  describe '#show' do
    context 'when unauthorised' do
      before { get :show, :params => { :dashboard_id => 42, :id => 999 } }
      include_examples 'api_unauthorized_examples'
    end

    context 'when authorised' do
      include_context 'api_authorisation'

      context 'with unowned dashboard' do
        before { get :show, :params => { :dashboard_id => 999, :id => 999 } }
        it { expect(response).to have_http_status(404) }
      end

      context 'with unowned widget' do
        before { get :show, :params => { :dashboard_id => dashboard.id, :id => 999 } }
        it { expect(response).to have_http_status(404) }
      end

      context 'with dashboard and widget' do

        let(:widget)  { dashboard.widgets.first }

        let(:schema)  { widget_schema }

        before { get :show, :params => { :dashboard_id => dashboard.id, :id => widget.id } }

        include_examples 'api_authorized_ok'
      end
    end
  end

  describe '#update' do

    let(:widget)  { dashboard.widgets.first }

    context 'when unauthorised' do
      before { put :update, :params => { :dashboard_id => 999, :id => 42, :widget => {} } }
      include_examples 'api_unauthorized_examples'
    end

    context 'when authorised' do
      include_context 'api_authorisation'

      context 'with unowned dashboard' do
        before { put :update, :params => { :dashboard_id => 999, :id => 999, :widget => {} } }
        it { expect(response).to have_http_status(404) }
      end

      context 'with unowned widget' do
        before { put :update, :params => { :dashboard_id => dashboard.id, :id => 999, :widget => {} } }
        it { expect(response).to have_http_status(404) }
      end

      context 'with invalid data' do
        let(:status)  { 400 }
        let(:schema)  { error_schema }

        before { put :update, :params => { :dashboard_id => dashboard.id, :id => widget.id, :name => '', :type => 'BLAH CHART' } }

        include_examples 'api_authorized_status_and_schema'
      end


      context 'with valid data' do

        let(:schema)      { widget_schema }

        before { put :update, :params => { :dashboard_id => dashboard.id, :id => widget.id, :name => 'Vtha', :type => 'BLAH CHART' } }

        it { expect(widget.reload.name).to eq 'Vtha' }
        it { expect(widget.reload.type).to eq 'bar' }
        include_examples 'api_authorized_ok'
      end
    end

  end

end
