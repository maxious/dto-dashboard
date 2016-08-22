class Dashboard < ApplicationRecord
  include Nameable

  belongs_to :organisation
  has_many :widgets

  def self.published
    where('published_at <= NOW()')
  end

  def rows
    @rows ||= widgets.without_hero.by_row.by_pos.inject([]){ | a, w|
      a[w.row] = [] unless a[w.row]
      a[w.row] << w
      a
    }.compact
  end

  def first_row
    rows.first
  end

  def remaining_rows
    rows.drop(1)
  end

end
