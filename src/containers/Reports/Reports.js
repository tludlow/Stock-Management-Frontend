import React from 'react';
import moment from "moment";

export default function Reports() {
    //The end of this day, which is midnight, which is when the next report is generated,
    let midnight = moment().endOf("day")

   return (
        <>
        <div className="px-4 pb-2 md:px-0 flex justify-between items-center border-b border-gray-300">
            <div className="">
                <h1 className="text-brand font-bold text-2xl">Reports &bull; 
                <span className="text-gray-700 font-normal text-base tracking-tight"> Next report generated: <strong>{midnight.fromNow()}</strong></span></h1>
                <p>Reports are generated here for the regulator. These reports contain:</p>
            </div>
            <div className="flex flex-col items-end">
                <p className="text-md">Search for the contents of a report</p>
                <form className="flex" action="">
                    <span>
                        <svg className="fill-current h-6 h-6 bg-white text-gray-500 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/></svg>
                    </span>
                    <input className="px-2 py-1 rounded-l" type="text" placeholder="Search"/>
                    <button className="px-4 py-1 bg-indigo-600 text-white rounded-r" type="submit">Go</button>
                </form>
            </div>
        </div>

        
        </>
   );
}