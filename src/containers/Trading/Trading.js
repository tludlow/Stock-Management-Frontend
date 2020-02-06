import React, { useState, useEffect } from 'react';
import { Link } from "react-router"

//API Import
import api from "../../api";

//Components
import Action from "./Action";
import Trade from "./Trade";


const months = ["Jan", "Feb" , "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let date = new Date()

let trades = [
    {
        risk: 33,
        type: "Stock",
        buyingCompany: "Apple",
        sellingCompany: "Google",
        quantity: 123,
        strikePrice: "27.63",
        underlyingCurrency: "USD",
        underlyingCurrencySymbol: "$",
        maturityDate: "24th Mar 2020"
    },
    {
        risk: 33,
        type: "Stock",
        buyingCompany: "Apple",
        sellingCompany: "Google",
        quantity: 123,
        strikePrice: "27.63",
        underlyingCurrency: "USD",
        underlyingCurrencySymbol: "$",
        maturityDate: "24th Mar 2020"
    },
    {
        risk: 55,
        type: "Alpaca",
        buyingCompany: "Argos",
        sellingCompany: "B&Q",
        quantity: 123,
        strikePrice: "27.63",
        underlyingCurrency: "EUR",
        underlyingCurrencySymbol: "£",
        maturityDate: "24th Mar 2020"
    },
    {
        risk: 70,
        type: "Stock",
        buyingCompany: "Apple",
        sellingCompany: "Google",
        quantity: 123,
        strikePrice: "27.63",
        underlyingCurrency: "USD",
        underlyingCurrencySymbol: "$",
        maturityDate: "24th Mar 2020"
    },
]

export default function Trading() {
    const [loading, setLoading] = useState(false);

    //trade/buyer=FORM54/
    // useEffect(()=> {
    //     //Get the trading data.
    //     api.get("/trade/buyer/FORM54/").then((res)=> {
    //         console.log(res);
    //         setLoading(false);
    //     }).catch((error)=> {
    //         console.log(error);
    //     });

    // });

    if (loading) {
        return (
            <>
            <div className="px-4 md:px-0">
                <div className="flex items-center">
                    <h1 className="text-brand font-bold text-2xl">Trades &bull; 
                    <span className="ml-2 text-gray-500 font-normal text-base uppercase tracking-tight"> {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}, {days[date.getDay()]} - {date.getHours()}:{String(date.getMinutes()).padStart(2, "0")}</span></h1>
                </div>
                <p>View, manage and act on trade information</p>
            </div>
            
            <div className="mt-6 flex flex-wrap justify-center md:justify-between w-auto">
                <Action title="Create a Trade" message="Insert a new trade’s data into the system manually" linkTo="/trading/create-trade" icon="create" />
                <Action title="Edit a Trade" message="Update a trade that already exists to it’s new values" linkTo="/trading/edit-trade" icon="edit" />
                <Action title="Delete a Trade" message="Delete an already existing trade from the system" linkTo="/trading/delete-trade" icon="delete" />
            </div>

            <div className="h-32 w-32 mx-auto spinner text-center"></div>
            </>
        );
    }
    return (
        <>
        <div className="px-4 md:px-0">
            <div className="flex items-center">
                <h1 className="text-brand font-bold text-2xl">Trades &bull; 
                <span className="ml-2 text-gray-500 font-normal text-base uppercase tracking-tight"> {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}, {days[date.getDay()]} - {date.getHours()}:{String(date.getMinutes()).padStart(2, "0")}</span></h1>
            </div>
            <p>View, manage and act on trade information</p>
        </div>
        
        <div className="mt-6 flex flex-wrap justify-center md:justify-between w-auto">
            <Action title="Create a Trade" message="Insert a new trade’s data into the system manually" linkTo="/trading/create-trade" icon="create" />
            <Action title="Edit a Trade" message="Update a trade that already exists to it’s new values" linkTo="/trading/edit-trade" icon="edit" />
            <Action title="Delete a Trade" message="Delete an already existing trade from the system" linkTo="/trading/delete-trade" icon="delete" />
        </div>
    
        <div className="trades mt-16 mx-4">
            <div className="w-full flex justify-between items-baseline">
                <h3 className="text-brand font-bold text-lg mb-1">Recent Trades</h3>
                <Link to="/trading/all" className="px-2 py-1 bg-brand rounded text-white uppercase font-semibold leading-normal text-xs hover:text-gray-300 hover:bg-indigo-700 cursor-pointer">View more</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {trades.map((trade, i) => (
                    <Trade
                        key={i}
                        risk={trade.risk}
                        type={trade.type} 
                        buyingCompany={trade.buyingCompany} 
                        sellingCompany={trade.sellingCompany} 
                        quantity={trade.quantity} 
                        strikePrice={trade.strikePrice}
                        maturityDate={trade.maturityDate}
                    />
                ))}
            </div>
        </div>
        </>
    );
}