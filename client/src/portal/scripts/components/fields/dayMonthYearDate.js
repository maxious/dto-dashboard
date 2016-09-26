import React, { Component } from 'react';
import moment from 'moment';


class DayMonthYearDate extends Component {

  /**
   * Compute to consume
   */
  getParsed(ts) {
    let _ts = moment(ts);
    return {
      d: _ts.date(),
      m: _ts.month(),
      y: _ts.year()
    }
  }

  getToday() {
    let _ts = moment(new Date());
    return {
      d: _ts.date(),
      m: _ts.month(),
      y: _ts.year()
    }
  }

  /**
   * Compute to emit
   */
  serialize(d, m, y) {
    let _ts = moment().date(d).month(m).year(y).format();
    console.log(_ts);
    return moment(_ts).toString();
  }

  emit(value) {
    this.props.input.onBlur(value);
  }

  onUpdateField() {
    this.setState({
      day: this.refs.day.value,
      month: this.refs.month.value,
      year: this.refs.year.value,
    });
    this.emit(this.serialize(this.state.day, this.state.month, this.state.year));
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
      res.push({label:years[i], value:i});
    }
    return res;
  }

  componentWillMount() {
    let _defaultVals = this.getToday();
    let _parsedVals = this.getParsed();
    this.setState({
      defaultDay: _defaultVals.d,
      defaultMonth: _defaultVals.m,
      defaultYear: _defaultVals.y,
      day: _parsedVals.d,
      month: _parsedVals.m,
      year: _parsedVals.y,
    });
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
        <label htmlFor={name}
               className="control-label">{label}{isOptional === true && <sup> Optional</sup>}</label>

        <input type="hidden" {...input} />

        <div className="date-fields--ddmmyyy">
          <div className="date-fields__field">
            <label htmlFor={`${name}_day`}>Day</label>
            <select id={`${name}_day`} ref="day"
                    {...fieldProps}
                    default={this.state.defaultDay}
                    value={this.state.day}
                    onChange={this.onUpdateField.bind(this)}>
              {this.getDayOptions().map((option, idx) => {
                return <option key={idx} value={option.value} disabled={option.disabled}>{option.label}</option>
              })}
            </select>
          </div>
          <div className="date-fields__field">
            <label htmlFor={`${name}_month`}>Month</label>
            <select id={`${name}_month`} ref="month"
                    {...fieldProps}
                    default={this.state.defaultMonth}
                    value={this.state.month}
                    onChange={this.onUpdateField.bind(this)}>
              {this.getMonthOptions().map((option, idx) => {
                return <option key={idx} value={option.value} disabled={option.disabled}>{option.label}</option>
              })}
            </select>
          </div>
          <div className="date-fields__field">
            <label htmlFor={`${name}_year`}>Year</label>
            <select id={`${name}_year`} ref="year"
                    {...fieldProps}
                    default={this.state.defaultYear}
                    value={this.state.year}
                    onChange={this.onUpdateField.bind(this)}>
              {this.getYearOptions().map((option, idx) => {
                return <option key={idx} value={option.value} disabled={option.disabled}>{option.label}</option>
              })}
            </select>
          </div>
        </div>
        {touched && error && <span className="help-block">{error}</span>}
      </div>
    )
  }
}

export default DayMonthYearDate;
