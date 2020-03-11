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

export default function Trading() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [trades, setTrades] = useState([]);

    useEffect(()=> {
        console.log("getting company data");
        api.get("/trade/recent").then(response => {
            console.log(response);
            setError("");
            setTrades(response.data);
            setLoading(false);
        }).catch(err => {
            console.log(err);
            setError(err.message);
            setLoading(false);
        });
        
    }, []);

    if (error.length > 0) {
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

            <h5 className="text-red-700">{error}</h5>
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
            <Action title="Find a Trade" message="Find a trade in the system to view, edit or delete" linkTo="/trading/find-trade" icon="find" />
            <Action title="Delete a Trade" message="Delete an already existing trade from the system" linkTo="/trading/delete-trade" icon="delete" />
        </div>
        
        <div className="trades mt-16 mx-4">
            <div className="w-full flex justify-between items-baseline">
                <h3 className="text-brand font-bold text-lg mb-1">Trades
                    <span className="block text-gray-500 text-sm font-normal">Ordered by: recent</span>
                    <span className="block text-gray-500 text-sm font-normal">Trades with warning symbols contain erroneous data</span>
                </h3>
                <Link to="/trading/all" className="px-2 py-1 bg-brand rounded text-white uppercase font-semibold leading-normal text-xs hover:text-gray-300 hover:bg-indigo-700 cursor-pointer">View more</Link>
            </div>
            
            {loading ? <div className="h-32 w-32 mx-auto spinner text-center"></div> :

            trades.length === 0 ? <p className="text-center text-brand font-semibold text-lg">No trades are in the system.</p> :
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {trades.map((trade, i) => (
                    <Trade
                        key={i}
                        risk={Math.floor(Math.random() * 100) + 1}
                        id={trade.id}
                        type={trade.product_id}
                        product={trade.product} 
                        buying_company_id={trade.buying_party} 
                        selling_company_id={trade.selling_party}
                        buying_company={trade.buying_company} 
                        selling_company={trade.selling_company} 
                        quantity={trade.quantity} 
                        strikePrice={trade.strike_price}
                        maturityDate={trade.maturity_date}
                        errors={trade.errors}
                    />
                ))}
            </div>
            }
        </div>
        </>
    );
}