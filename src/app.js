import './scss/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';

import DotGameComponent from './components/DotGameComponent';

const renderApplication = () => {
  ReactDOM.render(
    <DotGameComponent /> ,
    document.querySelector('#root')
  );
}

renderApplication(DotGameComponent);

if (module.hot) {
  module.hot.accept("./components/DotGameComponent", () => {
    renderApplication();
  });
}
