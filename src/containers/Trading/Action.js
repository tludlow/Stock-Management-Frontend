//Component representing the buttons which have CRUD operations for trades.
import React from "react";
import { browserHistory } from "react-router";

export default function Action(props) {
    return (
        <div className="bg-white w-11/12 md:w-2/5 md:mt-2 lg:mt-0 lg:w-3/12 mt-8 md:mt-0 px-4 py-4 justify-top flex shadow-md rounded-lg cursor-pointer hover:shadow-lg" onClick={()=> browserHistory.push(props.linkTo)}>
            <div className="icon mt-1">
                {props.icon === "create" ? <svg width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 .34375C5.11328.34375.34375 5.11328.34375 11c0 5.8867 4.76953 10.6562 10.65625 10.6562 5.8867 0 10.6562-4.7695 10.6562-10.6562C21.6562 5.11328 16.8867.34375 11 .34375zm6.1875 11.85935c0 .2836-.232.5157-.5156.5157h-3.9531v3.9531c0 .2836-.2321.5156-.5157.5156H9.79688c-.2836 0-.51563-.232-.51563-.5156v-3.9531H5.32812c-.28359 0-.51562-.2321-.51562-.5157V9.79688c0-.2836.23203-.51563.51562-.51563h3.95313V5.32812c0-.28359.23203-.51562.51563-.51562h2.40622c.2836 0 .5157.23203.5157.51562v3.95313h3.9531c.2836 0 .5156.23203.5156.51563v2.40622z" fill="#3A456E"/></svg> : ""}
                {props.icon === "edit" ?  <svg width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.3771 3.5714l3.4451 3.87654c.1452.16331.1452.42977 0 .59308l-8.3416 9.38618-3.54449.4427c-.47361.0602-.87465-.3911-.82118-.924l.3934-3.9883L14.85 3.5714c.1451-.16331.3819-.16331.5271 0zm6.1875-.98418L19.7007.489939c-.5806-.653252-1.524-.653252-2.1083 0L16.2403 2.01133c-.1452.16331-.1452.42977 0 .59308l3.4451 3.87654c.1452.16332.382.16332.5271 0l1.3521-1.52139c.5805-.65755.5805-1.71908 0-2.37234zM14.6667 14.8744v4.3751H2.44444V5.49678h8.77706c.1222 0 .2368-.05587.3247-.15042l1.5278-1.71909c.2902-.32663.084-.88103-.3247-.88103H1.83333C.821181 2.74624 0 3.67025 0 4.80914V19.9371C0 21.076.821181 22 1.83333 22H15.2778c1.0121 0 1.8333-.924 1.8333-2.0629v-6.7818c0-.4599-.4927-.6876-.783-.3653l-1.5278 1.7191c-.084.0988-.1336.2278-.1336.3653z" fill="#3A456E"/></svg> : ""}
                {props.icon === "delete" ? <i className="fas fa-trash-alt fill-current text-brand text-xl"></i> : ""}
            </div>
            <div className="text ml-4">
                <h3 className="text-brand font-semibold text-lg">{props.title}</h3>
                <p>{props.message} <svg className="inline-block fill-current text-gray-800 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path class="heroicon-ui" d="M18.59 13H3a1 1 0 0 1 0-2h15.59l-5.3-5.3a1 1 0 1 1 1.42-1.4l7 7a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.42-1.4l5.3-5.3z"/></svg></p>
            </div>
        </div>
    );
}