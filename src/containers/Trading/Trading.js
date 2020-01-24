import React from 'react';

//Action component
import Action from "./Action";

//eslint-disable-next-line
import css from "./trading.scss"

const months = ["Jan", "Feb" , "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let date = new Date()

export default function Trading() {
    return (
        <>
        <div className="top-bar">
            <div className="top-line">
                <h4>Trades</h4>
                <p>{date.getDate()} {months[date.getMonth()]} {date.getFullYear()}, {days[date.getDay()]}</p>
            </div>
            <p>View, manage and act on trade information</p>
        </div>
        <div className="page">
            <div className="action-headers">
                <Action title="Create a Trade" message="Insert a new trade’s data into the system manually" linkTo="/trading/create-trade" icon="create" />
                <Action title="Edit a Trade" message="Update a trade that already exists to it’s new values" linkTo="/trading/edit-trade" icon="edit" />
                <Action title="Delete a Trade" message="Delete an already existing trade from the system" linkTo="/trading/delete-trade" icon="delete" />
            </div>
        </div>
        </>
    );
}