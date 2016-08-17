class DashboardsController < ApplicationController

  attr_reader :dashboards, :dashboard, :widgets
  helper_method :dashboards, :dashboard

  def index
    @dashboards = Dashboard.published.by_name.all
    render :index
  end

  def show
    @dashboard = Dashboard.find(params[:id])
    @widgets = Widget.where(dashboard_id: @dashboard.id)
    render :show
  end
end
