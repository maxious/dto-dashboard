import React, { Component, PropTypes } from 'react';


class YyyyMmDdDate extends Component {

  static propTypes = {
    props: PropTypes.shape({
      input: React.PropTypes.object.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      fieldProps: React.PropTypes.object.isRequired,
      optionProps: React.PropTypes.object.isRequired,
    })
  };

  constructor(props, context) {
    super(props, context);
    this.state = this.deserializeDate(this.props.input.value);
  }

  componentDidMount() {
    this.updateField();
  }

  serializeDate() {
    return new Date(
      this.state.year,
      this.state.month,
      this.state.day
    ).toJSON();
  }

  deserializeDate(date) {
    date = !date ? new Date() : new Date(date);
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate()   // day of month
    }
  }

  emit() {
    this.props.input.onBlur(this.props.input.value);
  }

  updateField() {
    this.props.input.value = this.serializeDate();
    this.emit();
  }

  getDayOptions() {
    let res = [];
    for (var i=1; i <= 31; i++) {
      res.push({label:String(i), value:i});
    }
    return res;
  }

  getMonthOptions() {
    let res = [];
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    for (var i=0; i<months.length; i++) {
      res.push({label:months[i], value:i});
    }
    return res;
  }

  getYearOptions() {
    let res = [];
    let years = [
      '2015',
      '2016',
      '2017',
      '2018'
    ];
    for (var i=0; i<years.length; i++) {
      res.push({label:years[i], value:Number(years[i])});
    }
    return res;
  }

  onYearChange(e) {
    this.setState({
      'year': e.target.value
    }, this.updateField);
  }

  onMonthChange(e) {
    this.setState({
      'month': e.target.value
    }, this.updateField);
  }

  onDayChange(e) {
    this.setState({
      'day': e.target.value
    }, this.updateField);
  }

  render() {
    let {
      input, name, label,
      fieldProps,
      optionProps: { isOptional },
      meta: { touched, error }
    } = this.props;

    fieldProps = {autoComplete:'off', ...fieldProps};


    return (
      <div className="form-group">
        <label className="control-label">{label}{isOptional === true && <sup> Optional</sup>}</label>

        <input type="hidden" {...input} name={name} />

        <div className="date-fields--ddmmyyy">

          <div className="date-fields__field">
            <label htmlFor={`${name}_year`}>Year</label>
            <select id={`${name}_year`} ref="year"
                    {...fieldProps}
                    value={this.state.year}
                    onChange={this.onYearChange.bind(this)}>
              {this.getYearOptions().map((o, idx) => {
                return <option key={idx} value={o.value} disabled={o.disabled}>{o.label}</option>
              })}
            </select>
          </div>

          <div className="date-fields__field">
            <label htmlFor={`${name}_month`}>Month</label>
            <select id={`${name}_month`} ref="month"
                    {...fieldProps}
                    defaultValue={this.state.month}
                    onChange={this.onMonthChange.bind(this)}>
              {this.getMonthOptions().map((o, idx) => {
                return <option key={idx} value={o.value} disabled={o.disabled}>{o.label}</option>
              })}
            </select>
          </div>

          <div className="date-fields__field">
            <label htmlFor={`${name}_day`}>Day</label>
            <select id={`${name}_day`} ref="year"
                    {...fieldProps}
                    value={this.state.day}
                    onChange={this.onDayChange.bind(this)}>
              {this.getDayOptions().map((o, idx) => {
                return <option key={idx} value={o.value} disabled={o.disabled}>{o.label}</option>
              })}
            </select>
          </div>

        </div>
        {touched && error && <span className="help-block">{error}</span>}
      </div>
    )
  }
}

export default YyyyMmDdDate;
