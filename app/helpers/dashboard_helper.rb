module DashboardHelper

  def DashboardHelper.sizeToStyle(size)
    cls = case size
            when 'extra-small' then
              'extra-small'
            when 'small' then
              'small'
            when 'medium' then
              'medium'
            when 'large' then
              'large'
            when 'full' then
              'full'
            else
              'medium'
          end
    return cls
  end

  class Helper
    def initialize(name, artist, duration)
      @name = name
      @artist = artist
      @duration = duration
    end

  end

end
