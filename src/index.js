import React from 'react';
import { render } from 'react-dom';
import Todo from './components/todo';

render(
  <Todo />,
  document.querySelector('#app')
);