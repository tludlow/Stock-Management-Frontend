import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute} from 'react-router'

/* Import CSS */
//import css from './styles/main.scss';

//Page container imports
import App from './containers/App.js';
import Home from "./containers/Home/Home.js";

import FourOFour from "./containers/FourOFour";

//Load state and browser history so we can use it in react-router
import store, {history} from './store';


//render the react app, in the structure provided by react-router into the index.html root element
render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />

                <Route path="/*" component={FourOFour} />
            </Route>

            
        </Router>
    </Provider>,
document.getElementById('root'));
