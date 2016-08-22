class DashboardsController < ApplicationController

  attr_reader :dashboards, :dashboard, :widgets
  helper_method :dashboards, :dashboard


  def index
    @dashboards = Dashboard.published.by_name.all

    @title = "Dashboard"
    @description = "Dashboard"

    render :index
  end

  def show
    @dashboard = Dashboard.find(params[:id]).decorate
    @widgets = Widget.where(dashboard_id: @dashboard.id)

    @title = @dashboard.name
    @description = @dashboard.name

    render :show
  end
end
