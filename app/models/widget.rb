class Widget < ApplicationRecord
  include Nameable
  include Measurable

  self.inheritance_column = :_type_disabled

  belongs_to :dashboard

  has_many :dataset_widgets
  has_many :datasets, :through => :dataset_widgets
  has_many :datapoints, :through => :datasets

  KPIS = ['User Satisfaction', 'Cost per Transaction', 'Digital Take Up', 'Completion Rate']

  validates :size, :type, :presence => true

  validates :size, inclusion: { in: %w(extra-small small medium large extra-large),
      message: "%{value} is not a valid size" }

  validates :type, inclusion: { in: %w(bar fact full kpi-sparkline line pie sparkline),
      message: "%{value} is not a valid chart type" }

  validates :row, :pos, :presence => true, :numericality => { :only_integer => true }

  def self.with_datasets
    includes(:datasets => :datapoints)
  end

  def self.hero
    where(:is_hero => true)
  end

  def self.kpis
    where(:name => KPIS)
  end

  def self.without_hero
    where.not(:is_hero => true)
  end

  def self.other
    where.not(:name => KPIS).where.not(:is_hero => true)
  end

  def self.by_row
    order(:row => 'ASC')
  end

  def self.by_pos
    order(:pos => 'ASC')
  end

  def multiple?
    datasets.many?
  end

  def has_data?
    datapoints.any?
  end

  def dataset
    datasets.first
  end

end
