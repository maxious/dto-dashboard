class WidgetDecorator < Draper::Decorator
  delegate_all

  def element_id
    "widget-#{name.parameterize }"
  end

  def style
    arity = multiple? ? 'multiple' : 'single'
    "#{type} #{arity}"
  end

  def show_description?
    description.present?
  end

  def summary
    return '' if (!has_data? || dataset.string?)

    date = dataset.previous.ts.to_formatted_s(:month_and_year)

    if dataset.trending?
      "#{dataset.trend.capitalize} by #{format(dataset.difference)} since #{date}"
    else
      "#{dataset.trend.capitalize} since #{date}"
    end
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
    data = as_json(:include => {
      :datasets => {
        :include => :datapoints
      }
    })

    data.merge(
      "summary" => summary,
      "suffix" => dataset.suffix,
      "latest" => dataset.latest
    )

  end
end
