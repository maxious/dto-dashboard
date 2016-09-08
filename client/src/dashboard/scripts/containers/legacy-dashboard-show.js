import { select } from 'd3-selection';

import FactWidget from './../legacy-components/Widgets/FactWidget';


class LegacyDashboardShow {

  constructor(store) {
    let self = this;
    store.subscribe((oldState, newState) => {
      if (!oldState) {
        self.props = newState;
        self.render();
      }
      // no requirement to handle this at this stage
      // if (newState !== oldState) {}
    });
  }

  render() {
    this.props.widgets.forEach((w) => {
      let el = select(`[data-id="${w.id}"] .widget__inner`);

      switch (w.type) {
        case 'bar':
          break;

        case 'fact':
          new FactWidget({
            description: w.description,
            element: el
          });
          break;

        case 'pie':
          break;

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
