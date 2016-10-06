class Api::V1::DatasetsController < Api::V1::ApiController

  before_action :find_dataset, :only => [:show, :update]
  attr_reader :dataset

  def index
    datasets = current_user.datasets.by_name.all
    render :json => datasets.to_json
  end

  def show
    render :json => dataset.to_json
  end

  def create
    with_invalid_record_handler do
      dataset = Dataset.create!(data.merge(:organisation => current_user.organisation))
      render :json => dataset.to_json, :status => :created
    end
  end

  def update
    with_invalid_record_handler do
      dataset.update_attributes!(data)
      render :json => dataset.to_json, :status => :ok
    end
  end

  private

  def find_dataset
    begin
      @dataset = current_user.datasets.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      head :not_found
    end
  end

  def data
    params.permit(:name, :label, :units)
  end

end
