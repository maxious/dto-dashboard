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

  def css_class
    name.parameterize
  end
end
