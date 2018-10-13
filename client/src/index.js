/* src/index.js */

/** Node Modules */
import React from 'react';
import ReactDOM from 'react-dom';

/** Components */
import Router from './router/Router';

/*** Bootstrap */
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

/** App css */
import './css/default.css';

ReactDOM.render(<Router />, document.getElementById('root'));
