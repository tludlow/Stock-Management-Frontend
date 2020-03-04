import React, { useState, useEffect } from "react";
import api from "../../api";

import Action from "./Action";
import Trade from "./Trade";

export default function TradingAll() {

    const months = ["Jan", "Feb" , "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let date = new Date()

    const [page, setPage] = useState(1)
    const [totalTrades, setTotalTrades] = useState(2)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const [trades, setTrades] = useState([])

    const changePage = (button) => {
        if(loading) {
            return;
        }

        if(button === "previous" && page === 1) {
            setPage(1)
        }
        if(button === "previous") {
            setPage(page - 1)
        }

        if(button === "next") {
            setPage(page + 1)
        }

    }


    useEffect(() => {
        setLoading(true)
        api.get("/trade/total").then(response => {
            setError("")
            setTotalTrades(response.data.total_trades)
        }).catch(error => {
            setError("Error getting total trades, try refreshing")
        })

        api.get(`/trade/recent?page_number=${page}`).then(response => {
            console.log(response)
            setError("");
            setLoading(false);
            setTrades(response.data);
        }).catch(err => {
            console.log(err);
            setError(err.message);
            setLoading(false);
        });

    }, [page])

    if (error.length > 0) {
        return (
            <>
            <div className="px-4 md:px-0">
                <div className="flex items-center">
                    <h1 className="text-brand font-bold text-2xl">Trades (all) &bull; 
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

            <div style={{minHeight: "645px"}} className="trades mt-16 mx-4">
            <div className="w-full flex justify-between items-baseline">
                <h3 className="text-brand font-bold text-lg mb-1">Trades <span className="block text-gray-500 text-sm font-normal">Ordered by: recent</span></h3>
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
                        />
                    ))}
                </div>
                }
            </div>

            <div className="mt-12 pb-12">
                <hr/>
                <div className="mt-3 flex justify-between">
                    <p>Showing <span className="font-bold">{(page-1) * 12}</span> to <span className="font-bold">{(page-1) * 12 + 12}</span> of <span className="font-bold">{totalTrades}</span> trades</p>
                    <div className="">
                        <button onClick={()=> changePage("previous")} className="w-24 bg-white border rounded p-2 mr-4 text-center">Previous</button>
                        <button onClick={()=> changePage("next")} className="w-24 bg-white border rounded p-2 text-center">Next</button>
                    </div>
                </div>
            </div>
        </>
    );
}