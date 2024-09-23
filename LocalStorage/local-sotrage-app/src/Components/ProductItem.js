import React from "react";

function ProductItem({product, dispatch}){
    const handleDelete=()=>{
        dispatch({type:'DELETE_PRODUCT',payload:product.code});
    }
    return(
        <div className="product-item">
            <span>{product.name}</span>
            <span>{product.code}</span>
            <span>{product.price}</span>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );

}
export default ProductItem;