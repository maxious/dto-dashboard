class PortalController < ApplicationController

  before_action :authenticate_user!

  protected

  def index
    render :index
  end

end
