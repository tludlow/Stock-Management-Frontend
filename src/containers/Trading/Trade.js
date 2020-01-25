import React, { useState, useEffect } from 'react';

export default function Trade(props) {
    //Risk is either: none, low, medium, high
    //Which maps to the colours: bg-gray-600, bg-green-700, bg-yellow-500, bg-red-790
    const [riskCategory, setRiskCategory] = useState("bg-gray-600");

    useEffect(()=> {
        if (props.risk == 0) {
            setRiskCategory("bg-gray-600");
        } else if (props.risk > 0 && props.risk <= 33) {
            setRiskCategory("bg-green-700");
        } else if (props.risk > 33 && props.risk <= 66) {
            setRiskCategory("bg-yellow-500");
        } else if (props.risk > 66) {
            setRiskCategory("bg-red-700");
        }
    });

    return (
        <div className="w-11/12 lg:w-1/3 px-2 mt-4 overflow-hidden">
            <div className="relative bg-white shadow rounded-lg p-4 overflow-hidden">
            <div className={"absolute risk-ribbon w-4 h-8 " + riskCategory}></div>
            <div className="w-auto h-auto flex justify-between">
                <div className="flex flex-col">
                    <h3 className="flex flex-col">
                        <span className="text-brand font-bold tracking-wide">{props.type}</span>
                        <span className="text-gray-600 text-sm uppercase font-semibold">{props.strikePrice} x {props.quantity}</span>
                    </h3>
                </div>
                <div className="flex items-center">
                    <p className="leading-none flex">
                        {props.sellingCompany}
                        <span className="fill-current text-brand w-4 h-4  mx-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path class="heroicon-ui" d="M18.59 13H3a1 1 0 0 1 0-2h15.59l-5.3-5.3a1 1 0 1 1 1.42-1.4l7 7a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.42-1.4l5.3-5.3z"/></svg>
                        </span>
                        {props.buyingCompany}
                    </p>
                </div>
                <div className="flex items-center">
                    <p className="text-white text-sm bg-gray-500 rounded px-4 py-1 uppercase font-semibold">{props.maturityDate}</p>
                </div>
            </div>
            </div>
        </div>
    );
}