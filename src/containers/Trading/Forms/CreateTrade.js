import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { browserHistory } from "react-router";

import api from "../../../api.js";
import axios from "axios";

export default function CreateTrade() {
    //Data for the auto suggested form inputs is found through the redux state of the app.
    
    const [loading, setLoading] = useState(true);
    const [companies, setCompanies] = useState([]);
    const [products, setProducts] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [error, setError] = useState("");
    const [formError, setFormError] = useState("Please enter all of the trade information");
    const [submitError, setSubmitError] = useState("")
    const [submitLoading, setSubmitLoading] = useState(false)
    const [submitStatus, setSubmitStatus] = useState("")

    const [sellingCompany, setSellingCompany] = useState(null);
    const [buyingCompany, setBuyingCompany] = useState(null);
    const [product, setProduct] = useState(null);
    const [underlyingCurrency, setUnderlyingCurrency] = useState(null);
    const [notionalCurrency, setNotionalCurrency] = useState(null);
    const [maturityDate, setMaturityDate] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [strikePrice, setStrikePrice] = useState(0);
    const [underlyingPrice, setUnderlyingPrice] = useState(0);

    useEffect(()=> {
        getCompaniesAndCurrenciesAndProducts();

        let interval = setInterval(() => {
            verifyForm(sellingCompany, buyingCompany, product, underlyingCurrency, notionalCurrency, maturityDate, quantity, strikePrice, underlyingPrice);
        }, 500);

        return ()=> {
            clearInterval(interval);
        }
    }, [sellingCompany, buyingCompany, product, underlyingCurrency, notionalCurrency, maturityDate, quantity, strikePrice, underlyingPrice]);

    //Gets products, companies and currencies from the backend so we can auto suggest these to the user
    const getCompaniesAndCurrenciesAndProducts = () => {
        //Dont get new data for this if we already have it
        if (companies.length !== 0 && currencies.length !== 0) {
            return
        }

        setLoading(true);
        axios.all([
            api.get("/company/list"),
            api.get("/currency/list"),
            //api.get("/product/list")
        ]).then(axios.spread((companyRes, currencyRes) => {
            console.log(companyRes, currencyRes);
            setLoading(false);
            setCompanies(companyRes.data);
            setCurrencies(currencyRes.data);

            //Set the products to also include stocks at the top, this is a viable option not from the database
            //setProducts([{id: -1, name: "Stocks"}, ...productRes.data]);
            
        })).catch(err => {
            setError(err.message);
            setLoading(false);
            console.log(err);
        });
        verifyForm()
    }

    const onDropdownChangeCompanies = (tag, event, values) => {
        console.log(tag, values)
        if (tag === "selling-company") {
            //Reset the product when changing a seller, they may sell different products
            setProduct(null)

            setSellingCompany(values)

            //Get the products sold by this company
            if(values !== null) {
                api.get("/product/soldby/company_id=" + values.id).then(response => {
                    console.log(response);
                    setProducts([{id: -1, name: "Stocks (" + values.name + ")"}, ...response.data])
                }).catch(err => {
                    setError(err.message)
                    return
                });
            }
            

            //Check to delete the products before setting company to null, the products depend upon the selling company
            if (values === null) {
                setSellingCompany(null)
                setProduct(null)
                return;
            }

            //Update the products to notify the user that the stocks they could be buying would be for the selling comapny
            let currentProducts = products;
            if(products.length !== 0) {
                currentProducts[0] = {id: -1, name: "Stocks (" + values.name + ")"}
                setProducts(currentProducts)
            }
        }
        if (tag === "buying-company") {
            setBuyingCompany(values)
        }
    }

    const onDropdownChangeCurrencies = (tag, event, values) => {
        console.log(tag, values)
        if (tag === "underlying-currency") {
            setUnderlyingCurrency(values)
        }
        if (tag === "notional-currency") {
            setNotionalCurrency(values)
        } 
    }
    
    const onDropdownChangeProduct = (event, values) => {
        console.log(event, values)
        setProduct(values)
    }
    const maturityDateChange = (event) => {
        setMaturityDate(event.target.value)
    }

    const quantityChange = (event) => {
        setQuantity(event.target.value)
    }

    const strikePriceChange = (event) => {
        setStrikePrice(event.target.value)
    }

    const underlyingPriceChange = (event) => {
        setUnderlyingPrice(event.target.value)
    }

    const verifyForm = (sellingCompany, buyingCompany, product, underlyingCurrency, notionalCurrency, maturityDate, quantity, strikePrice, underlyingPrice) => {
        // console.log(sellingCompany, buyingCompany, product, underlyingCurrency, notionalCurrency, maturityDate, quantity, strikePrice, underlyingPrice)
        if (sellingCompany === null) {
            setFormError("Please enter a selling company")
            return
        }
        if (buyingCompany === null) {
            setFormError("Please enter a buying company")
            return
        }
        if(buyingCompany !== null && sellingCompany != null && buyingCompany.name === sellingCompany.name) {
            setFormError("The buying and selling company should not be the same")
            return
        }
        if(quantity < 1) {
            setFormError("The quantity should be greater than 0")
            return
        }
        if(maturityDate === "") {
            setFormError("Please enter a maturity date")
            return
        }
        if(product === null) {
            setFormError("Please enter a product being traded. You might have switched selling company after choosing a product. Please reselect the product")
            return
        }
        if(underlyingCurrency === null) {
            setFormError("Please enter an underlying currency")
            return
        }
        if(notionalCurrency === null) {
            setFormError("Please enter a notional currency")
            return
        }
        // if(underlyingCurrency !== null && notionalCurrency != null && notionalCurrency.currency === underlyingCurrency.currency) {
        //     setFormError("The underlying and notional currencies should be different")
        //     return
        // }
        if(strikePrice < 0.01) {
            setFormError("Please enter a strike price")
            return
        }
        if(underlyingPrice < 0.01) {
            setFormError("Please enter an underlying price")
            return
        }
        if (product !== undefined) {
            if (product.name.includes("Stocks") && !product.name.includes(sellingCompany.name)) {
                setFormError("Please update the stocks being purchased in the product section, you updated the selling company after selling the stock product.")
                return
            }
        }
        setFormError("")    
    }

    const onSubmit = (e) => {
        e.preventDefault()
        //Cant submit if we have form errors
        if(formError.length > 0) {
            return
        }
        
        setSubmitLoading(true)
        setSubmitError("")
        setSubmitStatus("")
        api.post("/trade/create/", {
            "selling_party": sellingCompany.id,
            "buying_party": buyingCompany.id,
            "product": product.id,
            "quantity": quantity,
            "maturity_date": maturityDate,
            "underlying_currency": underlyingCurrency.currency,
            "notional_currency": notionalCurrency.currency,
            "strike_price": strikePrice,
            "underlying_price": underlyingPrice 
        }).then(response => {
            console.log(response);
            setSubmitLoading(false)
            if (response.status === 200) {
                setSubmitStatus("Trade successfully created.")
                browserHistory.push(`/trade/${response.data.trade_id}`)
            }
        }).catch(err => {
            console.log(err);
            setSubmitLoading(false)
            setSubmitError(err.message)
        })
    }

    /**
     * VIEWS
     */

    if (loading || error) {
        return (
            <>
            <div className="flex flex-col items-center md:items-start">
                <h2 className="text-brand font-bold text-xl">Create a new trade</h2>
                <p>Insert the details for a derivative manually</p>
                <hr className="my-2" />
                <p>
                    If you are choosing the trade a Stock, this stock will be off the selling company. If you change the selling company after selecting the stock for a previously selected selling company you must reselect your product being traded.
                </p>
            </div>
            { error && 
                <div className="">
                    <h4 className="text-red-700 font-bold text-xl">Error</h4>
                    <p>{error}</p>
                </div>
            }

            {loading && <div className="h-32 w-32 mx-auto spinner text-center"></div> }
            </>
        );
    }

    //General render
    return (
        <>
        <div className="flex flex-col items-center md:items-start">
            <h2 className="text-brand font-bold text-xl">Create a new trade</h2>
            <p>Insert the details for a derivative manually</p>
            <hr className="my-2" />
            <p>
                If you are choosing the trade a Stock, this stock will be off the selling company. If you change the selling company after selecting the stock for a previously selected selling company you must reselect your product being traded.
            </p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 w-11/12 p-4 mx-auto h-auto flex flex-col justify-center items-center bg-white shadow rounded-lg">
            
            {/* Selling Company */}
            <div className="mb-8">
                <p className="mb-2 text-brand text-md font-semibold">Selling Company</p>
                <Autocomplete
                    id="selling-company-dropdown"
                    name="selling-company-dropdown"
                    options={companies}
                    onChange={(event, values)=> onDropdownChangeCompanies("selling-company", event, values)}
                    getOptionLabel={option => option.name}
                    style={{ width: 300 }}
                    renderInput={params => <TextField {...params} label="Selling Company" variant="outlined" />}
                />
            </div>

            {/* Buying party */}
            <div className="mb-8">
                <p className="mb-2 text-brand text-md font-semibold">Buying Company</p>
                <Autocomplete
                    id="buying-company-dropdown"
                    name="buying-company-dropdown"
                    options={companies}
                    onChange={(event, values)=> onDropdownChangeCompanies("buying-company", event, values)}
                    getOptionLabel={option => option.name}
                    style={{ width: 300 }}
                    renderInput={params => <TextField {...params} label="Buying Company" variant="outlined" />}
                />
            </div>
            
            {/* Product being traded */}
            <div className="mb-8">
                <p className="mb-2 text-brand text-md font-semibold">Product Type</p>

                {sellingCompany === null ?
                    <>
                    <p className="text-red-700">Please choose a selling company first</p>
                    <Autocomplete
                        id="product-dropdown"
                        name="product-dropdown"
                        options={products}
                        onChange={onDropdownChangeProduct}
                        getOptionLabel={option => option.name}
                        disabled
                        style={{ width: 300 }}
                        renderInput={params => <TextField {...params} label="Product" variant="outlined" />}
                    />
                    </>
                    :
                    <Autocomplete
                        id="product-dropdown"
                        name="product-dropdown"
                        options={products}
                        onChange={onDropdownChangeProduct}
                        getOptionLabel={option => option.name}
                        style={{ width: 300 }}
                        renderInput={params => <TextField {...params} label="Product" variant="outlined" />}
                    />
                }
            </div>

            {/* Underlying Currency */}
            <div className="mb-8">
                <p className="mb-2 text-brand text-md font-semibold">Underlying Currency</p>
                <Autocomplete
                    id="underlying-currency-dropdown"
                    name="underlying-currency-dropdown"
                    options={currencies}
                    onChange={(event, values)=> onDropdownChangeCurrencies("underlying-currency", event, values)}
                    getOptionLabel={option => option.currency}
                    style={{ width: 300 }}
                    renderInput={params => <TextField {...params} label="Underlying Currency" variant="outlined" />}
                />
            </div>

            {/* Underlying Currency */}
            <div className="mb-8">
                <p className="mb-2 text-brand text-md font-semibold">Notional Currency</p>
                <Autocomplete
                    id="notional-currency-dropdown"
                    name="notional-currency-dropdown"
                    options={currencies}
                    onChange={(event, values)=> onDropdownChangeCurrencies("notional-currency", event, values)}
                    getOptionLabel={option => option.currency}
                    style={{ width: 300 }}
                    renderInput={params => <TextField {...params} label="Notional Currency" variant="outlined" />}
                />
            </div>

            {/* Quantity */}
            <div className="mb-8" style={{width: "300px"}}>
                <p className="text-brand text-md font-semibold">Quantity</p>
                <small className="mb-2">Quantity must be a positive number, not including 0</small><br />
                <input onChange={quantityChange} value={quantity} min="1" className="w-full py-4 px-6 rounded border hover:border-gray-600" type="number" name="quantity" id="quantity"/>
            </div>

            {/* Maturity Date */}
            <div className="mb-8" style={{width: "300px"}}>
                <p className="mb-2 text-brand text-md font-semibold">Maturity Date</p>
                <small>Maturity Dates must be in the future</small>
                <input onChange={maturityDateChange} min={new Date().toISOString().split('T')[0]} className="w-full py-4 px-6 rounded border hover:border-gray-600" type="date" name="maturity-date" id="maturity-date"/>
            </div>
            
            {underlyingCurrency === null && <p className="mb-4 mt-4 text-red-800">Please enter an underlying currency before you enter the following details</p>}
            
            {/* Underlying Price */}
            <div className="mb-8" style={{width: "300px"}}>
                <p className="mb-2 text-brand text-md font-semibold">Underlying Price</p>
                <small>Underlying price must be a positive number (not 0)</small><br />
                {underlyingCurrency === null ? <small>The current price per unit represented in the underlying currency</small> : <small>The current price per unit represented in the underlying currency:  {underlyingCurrency.currency}</small>}
                <input disabled={underlyingCurrency === null} onChange={underlyingPriceChange} min={0.01} step=".01" className="w-full py-4 px-6 rounded border hover:border-gray-600" type="number" name="underlying-price" id="underlying-price"/>
            </div>

            {/* Stike Price */}
            <div className="mb-8" style={{width: "300px"}}>
                <p className="mb-2 text-brand text-md font-semibold">Strike Price</p>
                <small>Strike price must be a positive number (not 0)</small><br />
                {underlyingCurrency === null ? <small>Strike price is represented in the underlying currency</small> : <small>Strike price is represented in the underlying currency:  {underlyingCurrency.currency}</small>}
                <input disabled={underlyingCurrency === null} onChange={strikePriceChange} min={0.01} step=".01" className="w-full py-4 px-6 rounded border hover:border-gray-600" type="number" name="strike-price" id="strike-price"/>
            </div>
            
            {submitError.length > 0 && <p className="text-red-700">An error occured when creating the request: {submitError}</p>}
                
            {formError.length > 0 ?
                <>
                <p className="mb-4 text-red-600 font-semibold text-md">Error! {formError}</p>
                <button className="mx-auto mt-2 text-center px-3 py-2 rounded shadow bg-red-800 text-white uppercase font-semibold text-sm hover:cursor-not-allowed" type="submit"><i className="fas fa-ban"></i> Form Incomplete</button>
                </>
                :
                submitLoading ? <button className="mx-auto mt-2 text-center px-3 py-2 rounded shadow bg-brand text-white uppercase font-semibold text-sm" type="submit">Loading...</button> : <button className="mx-auto mt-2 text-center px-3 py-2 rounded shadow bg-brand text-white uppercase font-semibold text-sm" type="submit">Create Trade</button>
            }
            
        </form>
        </>
    );
}