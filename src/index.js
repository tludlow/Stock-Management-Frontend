import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute} from 'react-router'

//CSS Import
import './styles/tailwind.css';

//Page container imports
import App from './containers/App.js';
import Home from "./containers/Home/Home.js";

import Trading from "./containers/Trading/Trading.js";
//Trading forms, create, edit, delete
import CreateTrade from "./containers/Trading/Forms/CreateTrade.js";


//Reports page
import Reports from "./containers/Reports/Reports.js";

import FourOFour from "./containers/FourOFour";

//Load state and browser history so we can use it in react-router
import store, {history} from './store';


//render the react app, in the structure provided by react-router into the index.html root element
render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="/trading" component={Trading} />
                <Route path="/trading/create-trade" component={CreateTrade} />

                <Route path="/reports" component={Reports} />

                <Route path="/*" component={FourOFour} />
            </Route>

            
        </Router>
    </Provider>,
document.getElementById('root'));
