import React, { useState } from 'react';


export default function EditTrade() {
    const [gotTrade, setGotTrade] = useState("");

    if (gotTrade.length === 0) {
        return (
            <>
                <h2 className="text-brand text-2xl font-bold">Edit a Trade</h2>
                <p>Search for a trade to edit.</p>
                <button onClick={()=> setGotTrade("wow")}>FIND</button>
            </>
        );
    } else {
        return (
            <>
                <h1>FOUND TRADE WITH ID</h1>
                <button onClick={()=> setGotTrade("")}>RESET</button>
            </>
        );
    }
}