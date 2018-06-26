import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import {reducers} from './reducers/reducers';
import { createStore,applyMiddleware } from "redux";
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import thunkMiddleWare from 'redux-thunk';
import './css/public.css';
import './css/font-awesome.css';
import App from './App';

const store = createStore(reducers,applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);
