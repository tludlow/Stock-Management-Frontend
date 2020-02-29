import React, { useState, useEffect } from 'react';

import CurrencyLine from "./CurrencyLine";
import api from "../../api";

export default function Home() {
    const [changeData, setChangeData] = useState(null)
    const [changeLoading, setChangeLoading] = useState(true)
    const [changeError, setChangeError] = useState("")

    useEffect(()=> {
        document.title = "Home - CS261 Group 23";
        getChangeData()
    }, []);

    const getChangeData = () => {
        setChangeLoading(true)
        api.get("/currency/report/changes").then(response => {
            setChangeData(response.data)
            setChangeLoading(false)
        }).catch(error => {
            setChangeError("Error collecting data, try refreshing the page")
            setChangeLoading(false)
        })
    }

    return (
        <>
            <div className="px-4 md:px-0">
                <h1 className="text-brand font-bold text-2xl">Home</h1> 
                <p className="">Welcome to the Group 23 Derivative Trade Manager</p>
                <p>Below is some statistics about the information in the system to help you make educated decisions when trading</p>
            </div>

            <section id="most-apprecciatied" className="mt-16 mb-2 p-3">
                <h3 className="text-brand text-lg lg:text-xl font-bold">
                    Most Appreciated Currencies
                    <br className="block lg:hidden" /> <span className="lg:pl-2 text-gray-500 text-xs">(Past week)</span>
                    <p className="font-normal text-sm font-gray-600">The currencies which have seen the most increase in value this week (against the dollar)</p>
                </h3>

                {changeError.length > 0 ? <p className="text-red-700">{changeError}</p> :
                changeLoading ? <div className="h-24 w-24 mx-auto spinner text-center"></div> :
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {changeData.largest_appreciations.map((currency, i) => (
                        <div key={i} className="flex flex-col items-center bg-white p-2 rounded">
                            <p className="flex jusitfy-center text-center">
                                <span className="mb-2 font-bold text-lg text-center">{currency.currency}</span>
                                <span className="py-1 pl-2 text-green-500 font-bold">+ <span className="font-normal"></span>{currency.change}</span>
                            </p>
                            
                            <CurrencyLine 
                                key={i}
                                className="w-full h-full" 
                                data={currency} 
                                day_one={changeData.day_one}
                                day_two={changeData.day_two}
                                day_three={changeData.day_three}
                                day_four={changeData.day_four}
                                day_five={changeData.day_five}
                                day_six={changeData.day_six}
                                day_seven={changeData.day_seven}
                            />
                        </div>
                        
                    ))}
                </div>
                
                }
            </section>

            <section id="most-depreciated" className="mt-16 mb-2 p-3">
                <h3 className="text-brand text-lg lg:text-xl font-bold">
                    Most Depreciated Currencies
                    <br className="block lg:hidden" /> <span className="lg:pl-2 text-gray-500 text-xs">(Past week)</span>
                    <p className="font-normal text-sm font-gray-600">The currencies which have seen the most decrease in value this week (against the dollar)</p>
                </h3>
            </section>
        </>
    );
}
