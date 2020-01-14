import React from 'react';

/**
 * Encapsulating function for all the pages which stores data that is required within the tree.
 * @param {*} props Props which are being passed down the DOM tree
 */
export default function Main(props) {
    return (
        <div className="main">
            {/* We use cloneElement here so we can auto pass down props to other components within the tree. */}
            {React.cloneElement(props.children, props)}
        </div>
    );
}
