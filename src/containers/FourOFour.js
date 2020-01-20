import React from "react";
import { browserHistory } from "react-router";

export default function FourOFour(props) {
    return (
        <div className="fourofour">
            <h3>You have taken a wrong move! This page does not exist!</h3>
            <p className="button" onClick={()=> browserHistory.push("/")}>
                Go home
            </p>
        </div>
    );
}