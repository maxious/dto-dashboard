const ROUTE_TRANSITION_LEAVE = 200;
const ROUTE_TRANSITION_SCROLL_TOP_DELAY = ROUTE_TRANSITION_LEAVE + 100;
const ROUTE_TRANSITION_ENTER_DELAY = ROUTE_TRANSITION_SCROLL_TOP_DELAY;
const ROUTE_TRANSITION_ENTER = 600;

const CONFIG = {
  USE_FIXTURES: __DEV__,
  API_BASE_URL: '/api/v1/',
  token: '',
  ROUTE_TRANSITION_LEAVE,
  ROUTE_TRANSITION_SCROLL_TOP_DELAY,
  ROUTE_TRANSITION_ENTER_DELAY,
  ROUTE_TRANSITION_ENTER
};

export default CONFIG;
