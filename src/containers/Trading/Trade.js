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
                            <span className="flex text-brand font-bold tracking-wide">
                                {props.errors.length > 0 &&
                                    <div className="mr-3 flex">
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exclamation-circle" className="mt-1 mr-1 h-4 w-4 fill-current text-red-600 svg-inline--fa fa-exclamation-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path></svg>
                                        <span className="text-red-600">{props.errors.length}</span>
                                    </div>
                                }
                                
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