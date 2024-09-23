import React from "react";
import ProductItem from "./ProductItem";

function ProductList({products, dispatch}){
    if (products.length ===0) return <p>No hay productos</p>;
    return (
        <div>
            {products.map((product)=>(
                <ProductItem
                    key={products.code}
                    product={product}
                    dispatch={dispatch}
            />
            ))}
        </div>
    )
}
export default ProductList;