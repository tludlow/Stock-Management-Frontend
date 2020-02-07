import React from 'react';
import moment from "moment";
import { browserHistory } from "react-router";

import Report from "./Report";

export default function Reports() {
    //The end of this day, which is midnight, which is when the next report is generated,
    let midnight = moment().endOf("day")

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
                    <button className="px-4 py-1 bg-indigo-600 text-white rounded-r" type="submit">Go</button>
                </form>
            </div>
        </div>

        <div className="p-4 sm:p-0 mt-8">
            <h3 className="text-brand text-xl font-bold">Recent Reports</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="w-full flex flex-col items-center p-4 bg-white shadow-md rounded">
                    <h4 className="text-brand font-bold text-lg">13th October 2020</h4>
                    <p>Total Trades: 100</p>
                    <div className="w-full flex justify-around">
                        <p>Edited Trades: 50</p>
                        <p>Deleted Trades: 30</p>
                    </div>
                    <div className="w-full mt-4 flex flex-row justify-around">
                        <div className="flex flex-col item-center">
                            <p>Low Risk</p>
                            <p>20</p>
                        </div>
                        <div className="flex flex-col item-center">
                            <p>Medium Risk</p>
                            <p>35</p>
                        </div>
                        <div className="flex flex-col item-center">
                            <p>High Risk</p>
                            <p>4</p>
                        </div>
                    </div>

                    <div className="mt-4">
                        <button onClick={()=> browserHistory.push("/report/wow")} className="bg-brand h-10 text-white px-2 py-1 rounded hover:shadow hover:bg-indigo-500">
                            Access Report
                        </button>
                        <button className="bg-gray-700 px-2 py-1 rounded shadow-md">
                            <p className="text-white pr-8">PDF</p>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M6 2h9a1 1 0 0 1 .7.3l4 4a1 1 0 0 1 .3.7v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2zm9 2.41V7h2.59L15 4.41zM18 9h-3a2 2 0 0 1-2-2V4H6v16h12V9z"/></svg>
                        </button>
                    </div>
                    
                </div>

            </div>
        </div>
        
        </>
   );
}