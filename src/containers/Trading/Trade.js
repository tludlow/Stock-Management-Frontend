import React from 'react';
import { browserHistory } from "react-router";

export default function Trade(props) {
    //Risk is either: none, low, medium, high
    //Which maps to the colours: bg-gray-600, bg-green-700, bg-yellow-500, bg-red-790
    // const [riskCategory, setRiskCategory] = useState("bg-gray-600");

    // useEffect(()=> {
    //     if (props.risk === 0) {
    //         setRiskCategory("bg-gray-600");
    //     } else if (props.risk > 0 && props.risk <= 33) {
    //         setRiskCategory("bg-green-700");
    //     } else if (props.risk > 33 && props.risk <= 66) {
    //         setRiskCategory("bg-yellow-500");
    //     } else if (props.risk > 66) {
    //         setRiskCategory("bg-red-700");
    //     }
    // });

    return (
        <div onClick={()=> browserHistory.push("/trade/" + props.id)} className="w-full h-full mt-4 pb-1 overflow-hidden ">
            <div className="cursor-pointer hover:shadow-md relative bg-white shadow rounded-lg p-4 overflow-hidden">
            {/* <div className={"absolute risk-ribbon w-4 h-8 " + riskCategory}></div> */}
            <div className="w-auto h-auto flex justify-between">
                <div className="flex flex-col flex-grow-0 overflow-hidden">
                    <h3 className="flex flex-col">
                        {props.product === "Stocks" ?  
                            <span className="text-brand font-bold tracking-wide ">{props.product} 
                                <span className="font-light text-xs">
                                    ({props.selling_company})
                                </span>
                            </span> :
                            <span className="text-brand font-bold tracking-wide">
                                {props.product}
                            </span>
                        }
                        <span className="text-gray-600 text-sm uppercase font-semibold">{props.strikePrice} x {props.quantity}</span>
                    </h3>
                </div>
                <div className="flex items-center">
                    <div className="leading-none flex">
                        <div className="flex flex-col text-center mr-2">
                            <p className="text-green-700">Buyer</p>
                            <p>{props.buying_company}</p>
                        </div>
                        <div className="flex flex-col text-center ml-2">
                            <p className="text-red-600">Seller</p>
                            <p>{props.selling_company}</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center">
                    <p className="text-white text-xs bg-gray-500 rounded px-4 py-1 uppercase font-semibold">{props.maturityDate}</p>
                </div>
            </div>
            </div>
        </div>
    );
}