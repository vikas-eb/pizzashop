import React from 'react';
import ReactDOM from 'react-dom';
import PizzaShop from '../PizzaShop';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PizzaShop />, div);
  ReactDOM.unmountComponentAtNode(div);
});
