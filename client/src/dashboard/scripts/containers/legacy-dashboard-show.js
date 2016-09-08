import { select } from 'd3-selection';

import FactWidget from './../legacy-components/Widgets/FactWidget';


class LegacyDashboardShow {

  constructor(store) {
  }

  render(props) {
    this.props = props;

    this.props.widgets.forEach((w) => {

      let el = select(`[data-id="${w.id}"] .widget__inner`);

      switch (w.type) {
        // case 'bar':
        //   break;

        case 'fact':
          new FactWidget({
            description: w.description,
            element: el
          });
          break;

        // case 'pie':
        //   break;

        // case 'kpi-sparkline':
        //   break;
        //
        // case 'sparkline':
        //   break;

        default:
          console.error('No chart type for widget type:', w.type);
      }
    });
    return this;
  }

}

export default LegacyDashboardShow;
