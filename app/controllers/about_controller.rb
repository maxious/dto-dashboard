class AboutController < ApplicationController

  def index
    @title = "Copyright"
    @description = "Copyright"

    render :copyright
  end

end
