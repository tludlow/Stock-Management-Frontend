import React from 'react';
import moment from "moment";
import { browserHistory } from "react-router";

//import Report from "./Report";

export default function Reports() {
    //The end of this day, which is midnight, which is when the next report is generated,
    let midnight = moment().endOf("day")

    let dates = [
        {
            date: "13-10-2020",
        },
        {
            date: "14-10-2020",
        },
        {
            date: "15-10-2020",
        },
        {
            date: "16-10-2020",
        }
    ]

   return (
        <>
        <div className="px-4 pb-2 md:px-0 flex flex-wrap justify-between items-center border-b border-gray-300">
            <div className="w-full sm:w-1/2">
                <h1 className="text-brand font-bold text-2xl">Reports &bull; <br className="block sm:hidden"/>
                <span className="text-gray-700 font-normal text-base tracking-tight"> Next report generated: <strong>{midnight.fromNow()}</strong></span></h1>
                <p>Reports are generated here for the regulator. These reports contain:</p>
            </div>
            <div className="flex flex-col mt-4 sm:mt-0 items-start sm:items-end">
                <p className="text-md">Search for a report by it's contents</p>
                <form className="flex" action="">
                    <input className="px-2 py-1 rounded-l" type="text" placeholder="Search"/>
                    <button className="px-4 py-1 bg-brand hover:bg-indigo-500 text-white rounded-r" type="submit">Go</button>
                </form>
            </div>
        </div>

        <div className="p-4 sm:p-0 mt-8">
            <h3 className="text-brand text-xl font-bold mb-4">Recent Reports</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

                {dates.map((date, index)=> (
                    <div key={index} className="w-full flex flex-col items-center p-4 bg-white shadow-md rounded">
                        <h4 className="mb-4 text-brand font-bold text-lg">{date.date}</h4>
                        <p>Total Trades: 100</p>
                        <div className="w-full mt-2 flex justify-around">
                            <p>Edited Trades: 50</p>
                            <p>Deleted Trades: 30</p>
                        </div>
                        <div className="w-full mt-4 flex flex-row justify-around">
                            <div className="flex flex-col">
                                <p className="text-green-500">Low Risk</p>
                                <p className="text-center">20</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-yellow-600">Medium Risk</p>
                                <p className="text-center">35</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-red-600">High Risk</p>
                                <p className="text-center">4</p>
                            </div>
                        </div>

                        <div className="mt-4 flex">
                            <button onClick={()=> browserHistory.push(`/report/${date.date}`)} className="bg-brand mr-4 h-10 text-white px-2 py-1 rounded hover:shadow hover:bg-indigo-500">
                                Access Report
                            </button>
                        </div>
                    </div>
                ))}


            </div>
        </div>
        
        </>
   );
}