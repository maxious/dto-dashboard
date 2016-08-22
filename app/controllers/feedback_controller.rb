class FeedbackController < ApplicationController

  def index
    @title = "Feedback"
    @description = "Feedback description"

    render :index
  end

end
