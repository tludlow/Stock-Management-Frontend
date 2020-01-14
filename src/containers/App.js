import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

import Main from './Main';

//Import scss
import "../styles/main.scss";

/*
  Here we specify which state needs to be made available to the component
  our state.posts and state.comments will be available via this.props.posts and this.props.comments
*/

/**
 * Maps the state of the application into a prop for every page which requires the data
 * @param {*} state The state of the application we want to put into a prop
 */
function mapStateToProps(state) {
    return {};
}

/**
 * When you want to dispatch an action you need to access it within the pages, this puts it within a page's props
 * @param {*} dispatch Dispatcher which is being loaded into the page props
 */
export function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

/*
  Here we create an <App/> component which is just our <Main/> component
  with it's props populated with our actions and our state

  We're injecting the data at the top level and passing it down, but you can connect() any component to make the actions
 and the store available to you within the components local scope
*/
let App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
