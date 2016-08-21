class DashboardDecorator < Draper::Decorator

  include SlugifyHelper

  delegate_all

  def dashboards_path
    return '/dashboards';
  end

  def dashboard_path
    slug = slugify(dashboard.name || dashboard.title)
    return "#{dashboards_path}/#{dashboard.id}-#{slug}"
  end
end
