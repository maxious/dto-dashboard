class DashboardDecorator < Draper::Decorator
  delegate_all

  def show_hero?
    display_hero && display_kpis && widgets.hero.present?
  end

  def show_kpis?
    display_kpis && widgets.kpis.any?
  end

  def show_notes?
    notes.present?
  end

  def show_url?
    url.present?
  end

  def name_slug
    name.downcase.parameterize()
  end

  def notes_to_html
    markdown.render(notes).html_safe
  end

  def name
    object.name.gsub(/dashboard\z/i, '').strip
  end

  def dashboardized_name
    name.downcase.index('dashboard') ? name : "#{name} Dashboard"
  end

  def last_updated_at
    object.last_updated_at.to_formatted_s(:month_year)
  end

  private

  def markdown
    render_options = {
      # will remove from the output HTML tags inputted by user
      filter_html: true,
      # will insert <br /> tags in paragraphs where are newlines
      # (ignored by default)
      hard_wrap: true,
      # hash for extra link options, for example 'nofollow'
      link_attributes: {rel: 'nofollow'}
      # more
      # will remove <img> tags from output
      # no_images: true
      # will remove <a> tags from output
      # no_links: true
      # will remove <style> tags from output
      # no_styles: true
      # generate links for only safe protocols
      # safe_links_only: true
      # and more ... (prettify, with_toc_data, xhtml)
    }
    renderer = Redcarpet::Render::HTML.new(render_options)

    extensions = {
      #will parse links without need of enclosing them
      autolink: true,
      # blocks delimited with 3 ` or ~ will be considered as code block.
      # No need to indent.  You can provide language name too.
      # ```ruby
      # block of code
      # ```
      fenced_code_blocks: true,
      # will ignore standard require for empty lines surrounding HTML blocks
      lax_spacing: true,
      # will not generate emphasis inside of words, for example no_emph_no
      no_intra_emphasis: true,
      # will parse strikethrough from ~~, for example: ~~bad~~
      strikethrough: true,
      # will parse superscript after ^, you can wrap superscript in ()
      superscript: true
      # will require a space after # in defining headers
      # space_after_headers: true
    }
    @markdown ||= Redcarpet::Markdown.new(renderer, extensions)
  end

end
