//Component representing the buttons which have CRUD operations for trades.
import React, { useEffect } from "react";
import { browserHistory } from "react-router";

export default function Action(props) {

    useEffect(()=> {
        document.title = "Trading - CS261 Group 23";
    });
    
    return (
        <div className="bg-white w-11/12 md:w-2/5 md:mt-2 lg:mt-0 lg:w-3/12 mt-4 md:mt-0 px-4 py-4 justify-top flex shadow-md rounded-lg cursor-pointer hover:shadow-lg" onClick={()=> browserHistory.push(props.linkTo)}>
            <div className="icon mt-1">
                {props.icon === "create" ? <svg width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 .34375C5.11328.34375.34375 5.11328.34375 11c0 5.8867 4.76953 10.6562 10.65625 10.6562 5.8867 0 10.6562-4.7695 10.6562-10.6562C21.6562 5.11328 16.8867.34375 11 .34375zm6.1875 11.85935c0 .2836-.232.5157-.5156.5157h-3.9531v3.9531c0 .2836-.2321.5156-.5157.5156H9.79688c-.2836 0-.51563-.232-.51563-.5156v-3.9531H5.32812c-.28359 0-.51562-.2321-.51562-.5157V9.79688c0-.2836.23203-.51563.51562-.51563h3.95313V5.32812c0-.28359.23203-.51562.51563-.51562h2.40622c.2836 0 .5157.23203.5157.51562v3.95313h3.9531c.2836 0 .5156.23203.5156.51563v2.40622z" fill="#3A456E"/></svg> : ""}
                {props.icon === "find" ?  <svg width="22" height="22" className="fill-current text-brand" aria-hidden="true" data-prefix="fas" data-icon="search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg> : ""}
                {props.icon === "delete" ? <i className="fas fa-trash-alt fill-current text-brand text-xl"></i> : ""}
            </div>
            <div className="text ml-4">
                <h3 className="text-brand font-semibold text-lg">{props.title}</h3>
                <p>{props.message} <svg className="inline-block fill-current text-gray-800 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path className="heroicon-ui" d="M18.59 13H3a1 1 0 0 1 0-2h15.59l-5.3-5.3a1 1 0 1 1 1.42-1.4l7 7a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.42-1.4l5.3-5.3z"/></svg></p>
            </div>
        </div>
    );
}