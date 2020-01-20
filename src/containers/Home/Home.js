import React from 'react';
import css from "./home.module.scss"

export default class Home extends React.Component {

	componentDidMount() {
        document.title = "Home"
    }

	render() {
		return (
            <div className={css.home}>
                <p>CS261 Frontend</p>
            </div>
        );
    }
}
