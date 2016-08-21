module SlugifyHelper

  def slugify(s)
    return s.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
  end

end
