import React from 'react';

//Action component
import Action from "./Action";


const months = ["Jan", "Feb" , "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let date = new Date()

export default function Trading() {
    return (
        <>
        <div className="px-4 md:px-0">
            <h1 className="text-brand font-bold text-xl">Trades &bull; <span className="text-gray-800 font-normal text-base">{date.getDate()} {months[date.getMonth()]} {date.getFullYear()}, {days[date.getDay()]}</span></h1>
            <p>View, manage and act on trade information</p>
        </div>
        
        <div className="mt-6 flex flex-wrap justify-center md:justify-between w-auto">
            <Action title="Create a Trade" message="Insert a new trade’s data into the system manually" linkTo="/trading/create-trade" icon="create" />
            <Action title="Edit a Trade" message="Update a trade that already exists to it’s new values" linkTo="/trading/edit-trade" icon="edit" />
            <Action title="Delete a Trade" message="Delete an already existing trade from the system" linkTo="/trading/delete-trade" icon="delete" />
        </div>
        </>
    );
}