import React from "react";

const Square =({value,onClick})=>{
    return(
        <button classname="square" onClick={onClick}>{value}</button>        
    );
};
export default Square;