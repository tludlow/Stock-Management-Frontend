import React, { useState } from 'react';
import Autosuggest from "react-autosuggest";


export default function CompanyAutoSuggest() {
    //State of the component.
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    //Load the possible companies from the backend.
    const tradeTypes = [
        {
            name: 'Company One',
            products: [
                "Pork",
                "Steak"
            ]
        },
        {
            name: 'Company Two',
            products: [
                "Steak",
                "Chicken"
            ]
        },
    ];

    const getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        
        if (inputLength === 0) {
            return [];
        } else {
            //Find all of the objects which have a product in the products array which has the input value as a substring
            let toReturn = [];
            tradeTypes.forEach((company, i) => {
                for (let product of company.products) {
                    if (product.toLowerCase().includes(inputValue)) {
                        toReturn.push(company);
                        break;
                    }
                }
            })
            //Only return objects wich are unique in the array.
            return [...new Set(toReturn)];
        }
    };
      
    //When a suggestion is clicked on from the suggestion list it needs to return a value to be put into the input
    const getSuggestionValue = suggestion => suggestion.name;
      
    // The view of the suggestion box on the page
    const renderSuggestion = suggestion => (
        <div className="">
            <span className="text-brand font-semibold">{suggestion.name}</span>
            <ul className="ml-4">
                {suggestion.products.map((product, i) => <li className="text-gray-800 text-sm uppercase font-semibold" key={i}>{product}</li>)}
            </ul>
        </div>
    );
    
    //Update the value of the state to be the value of the input.
    let onChange = (event, { newValue }) => {
        setValue(newValue);

        //Set the state of the input box in the redux state so its accessible in the parents.
    };
    
    //Only render suggestions if the length of the text typed into the input is of length at least 2.
    function shouldRenderSuggestions(value) {
        return value.trim().length > 1;
    }

    //When we fetch for new suggestions, add them to the suggestions state
    function onSuggestionsFetchRequested({ value }) {
        setSuggestions(getSuggestions(value));
    };
    
    //When its told to clear the suggestions, we should empty the array
    function onSuggestionsClearRequested() {
        setSuggestions([]);
    };

    //Some standard props of the component which are needed.
    const inputProps = {
        placeholder: "Apple, Google, AYIH50, ...",
        value,
        onChange: onChange
    };

    return (
        <Autosuggest
            multiSuggest={true} 
            suggestions={suggestions}
            shouldRenderSuggestions={shouldRenderSuggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps} 
        />
    );
}