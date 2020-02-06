import React from 'react';
import moment from "moment";

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
            <h3 className="text-brand text-lg font-bold">Recent Reports</h3>

            <div className="flex">
                <div class="px-2">
                    <div class="flex -mx-2">
                        <div class="w-1/3 px-2">
                            <div class="bg-gray-400 h-12">asd</div>
                        </div>
                        <div class="w-1/3 px-2">
                            <div class="bg-gray-500 h-12">asd</div>
                        </div>
                        <div class="w-1/3 px-2">
                            <div class="bg-gray-400 h-12"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        </>
   );
}