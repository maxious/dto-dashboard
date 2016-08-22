module DashboardHelper

  def size_to_style(size)
    return case size
             when 'extra-small' then
               'aus-width-one-fourth'
             when 'small' then
               'aus-width-one-third'
             when 'medium' then
               'aus-width-one-half'
             when 'large' then
               'aus-width-two-thirds'
             when 'full' then
               'aus-width-one-whole'
             else
               'aus-width-one-half'
           end
  end

end
