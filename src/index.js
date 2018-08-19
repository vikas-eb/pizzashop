import React from 'react';
import ReactDOM from 'react-dom';
import PizzaShop from './PizzaShop';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<PizzaShop />, document.getElementById('root'));
registerServiceWorker();