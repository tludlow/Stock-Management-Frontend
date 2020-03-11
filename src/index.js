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
import TradingAll from "./containers/Trading/TradingAll.js";
//Trading forms, create, edit, delete
import CreateTrade from "./containers/Trading/Forms/CreateTrade.js";
import EditTrade from './containers/Trading/Forms/EditTrade';
import DeleteTrade from './containers/Trading/Forms/DeleteTrade';
import FindTrade from "./containers/Trading/Forms/FindTrade";

import Trade from "./containers/Trade/Trade";


//Reports page
import Reports from "./containers/Reports/Reports.js";
import Report from "./containers/Reports/Report.js";

import FourOFour from "./containers/FourOFour";

//Load state and browser history so we can use it in react-router
import store, {history} from './store';

import Corrections from './containers/Corrections/Corrections';
import TradeCorrection from './containers/Corrections/TradeCorrections';


//render the react app, in the structure provided by react-router into the index.html root element
render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="/trading" component={Trading} />
                <Route path="/trading/all" component={TradingAll} />
                <Route path="/trading/create-trade" component={CreateTrade} />
                <Route path="/trading/edit-trade/:tradeID" component={EditTrade} />
                <Route path="/trading/delete-trade(/:tradeID)" component={DeleteTrade} />
                <Route path="/trading/find-trade" component={FindTrade} />
                <Route path="/trade/:tradeID" component={Trade} />

                <Route path="/reports" component={Reports} />
                <Route path="/report/:reportDate" component={Report} />

                <Route path="/corrections" component={Corrections} />
                <Route path="/corrections/:tradeID" component={TradeCorrection} />

                <Route path="/*" component={FourOFour} />
            </Route>

            
        </Router>
    </Provider>,
document.getElementById('root'));
