import moment from 'moment';
import { ISO_LONG_DATE } from './../../../_ui-kit/lib/constants/date-time';


export const humanisedLongDate = (timestamp) => {
  return moment(timestamp).format(ISO_LONG_DATE);
};
