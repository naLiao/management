import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom'
import ReactDOM from 'react-dom';
import './css/public.css';
import './css/font-awesome.css';
import App from './App';

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
);
