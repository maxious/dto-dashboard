class Dashboard < ApplicationRecord
  include Nameable

  belongs_to :organisation
  has_many :widgets

  def self.published
    where('published_at <= NOW()')
  end

end
