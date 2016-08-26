class WidgetDecorator < Draper::Decorator
  delegate_all
  # decorates_association :datasets

  def units_to_s
    if money? || percentage?
      units
    elsif string?
      'String'
    else
      'Numeric'
    end
  end

  def style
    arity = multiple? ? 'multiple' : 'single'
    "#{type} #{arity}"
  end

  def show_description?
    description.present?
  end

  def summary
    if (!has_data? || dataset.string? || dataset.previous.blank?)
      return ''
    end

    date = dataset.previous.ts.to_formatted_s(:month_and_year)

    if dataset.trending?
      "#{dataset.trend.capitalize} by #{format(dataset.difference)} since #{date}"
    else
      "#{dataset.trend.capitalize} since #{date}"
    end
  end

  def last_updated
    "Last updated #{updated_at.to_formatted_s(:month_and_year)}"
  end

  def format(change)
    case
      when dataset.percentage?
        helpers.number_to_percentage(change.abs, :precision => 2)
      when dataset.money?
        helpers.number_to_currency(change.abs)
      when dataset.integer?
        change.abs.to_i
      else
        change.abs
    end
  end

  def to_chart
    serializer = WidgetSerializer.new(widget, :include => 'datasets.datapoints')
    serializer.to_json
  end

  def datasets_to_chart
    object.datasets.collect{ |d| DatasetSerializer.new(d) }.to_json
  end

  def name_slug
    name.downcase.parameterize('-')
  end

end