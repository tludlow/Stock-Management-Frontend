import React from 'react';


//eslint-disable-next-line
import css from "./tradeforms.scss"

export default function CreateTrade() {
    return (
        <>
        <div className="top-bar">
            <div className="top-line">
                <h4>Create a Trade</h4>
            </div>
            <p>Create a new trade to be inserted into the system</p>
        </div>
        <div className="form-container">
            <form action="">
                <div className="form-row">
                    <label htmlFor="type">
                    <p>Trade Type</p>
                        <input name="type" type="text" placeholder="Stocks" autoComplete="on"/>
                    </label>
                    <label htmlFor="type">
                        <p>Trade Type</p>
                        <input name="type" type="text" placeholder="Stocks" autoComplete="on"/>
                    </label>
                </div>
                <div className="form-row">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
        </>
    );
}