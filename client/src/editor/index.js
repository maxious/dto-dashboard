import './styles/main'

import './images/editor-skeleton.png';


// // check if HMR is enabled
if (module.hot) {
  // accept itself
  module.hot.accept();

  // todo - improve
  // charts depend on CSS layout, so delay the
  // async render to allow css to inject first.
  // this is only an issue on dev-server mode.
  // http://stackoverflow.com/questions/39400038/how-to-ensure-that-hot-css-loads-before-js-in-webpack-dev-server
  console.log('Start: delaying JS execution by 3 seconds.');
  setTimeout(() => {
    console.log('Executing.');
    require('./scripts/main');
  }, 3000);
} else {
  require('./scripts/main');
}
