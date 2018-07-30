import React from 'react';
import { render } from 'react-dom';
import Todo from './components/todo';
import TestAync from './components/testAync';

render (
	<div>
		<Todo/>
		<TestAync/>
	</div>, document.querySelector('#app'));