class Dataset < ApplicationRecord
  include Measurable
  include Nameable

  belongs_to :organisation

  has_many :datapoints, :dependent => :destroy

  has_many :widgets, :through => :dataset_widgets

  has_many :dataset_widgets

  before_validation :set_units
  before_validation :set_label

  validates :name, :label, :units, :presence => true

  def latest
    datapoints.by_time.last
  end

  def previous
    datapoints.by_time.offset(1).last
  end

  def up?
    difference > 0
  end

  def down?
    !up?
  end

  def trending?
    difference != 0
  end

  def difference
    latest.value - previous.value
  end

  def trend
    return 'unchanged' if !trending?
    up? ? 'up' : 'down'
  end

  def has_data?
    datapoints.any?
  end

  def set_units
    self.units = 'n' if self.units.blank?
  end

  def set_label
    self.label = 'n' if self.label.blank?
  end
end
