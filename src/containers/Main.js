import React, { useState } from 'react';
import { Link, browserHistory } from "react-router";

export default function Main(props) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="main bg-gray-100 subpixel-antialiased h-screen text-gray-800">
            <header className="bg-brand shadow-lg sm:flex sm:justify-between sm:items-center sm:px-20 sm:py-1">
                <div className="flex items-center justify-between px-4 py-1 sm:p-0">
                    <div className="hover:cursor-pointer">
                        <h1 onClick={()=> browserHistory.push("/")} className="text-white font-bold text-2xl hover:cursor-pointer"><span className="text-blue-400 hover:cursor-pointer">Group</span> 23</h1>
                    </div>
                    <div className="sm:hidden">
                    <button onClick={()=> setIsOpen(!isOpen)} type="button" className="block text-gray-500 hover:text-white focus:text-white focus:outline-none">
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                            {isOpen === true ? <path fillRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/> : ""}
                            {isOpen === false ? <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/> : "" }
                        </svg>
                    </button>
                    </div>
                </div>
                <nav className={`${isOpen ? 'block' : 'hidden'} px-2 pt-2 pb-4 sm:flex sm:p-0`}>
                    <Link onClick={()=> setIsOpen(false)} to="/" className="block px-3 py-2 text-white font-semibold rounded hover:bg-gray-800">Home</Link>
                    <Link onClick={()=> setIsOpen(false)} to="/trading" className="mt-1 block px-3 py-2 text-white font-semibold rounded hover:bg-gray-800 sm:mt-0 sm:ml-6">Trading</Link>
                    <Link onClick={()=> setIsOpen(false)} to="/reports" className="mt-1 block px-3 py-2 text-white font-semibold rounded hover:bg-gray-800 sm:mt-0 sm:ml-6">Reports</Link>
                    <Link onClick={()=> setIsOpen(false)} to="/corrections" className="mt-1 block px-3 py-2 text-white font-semibold rounded hover:bg-gray-800 sm:mt-0 sm:ml-6">Errors / Corrections</Link>
                </nav>
            </header>
            <div className="p-4 md:p-0  content container mx-auto mt-6 flex flex-col align-center md:justify-start text-gray-800 bg-gray-100">
                {/* We use cloneElement here so we can auto pass down props to other components within the tree. */}
                {React.cloneElement(props.children, props)}
            </div>
        </div>
    );
}
