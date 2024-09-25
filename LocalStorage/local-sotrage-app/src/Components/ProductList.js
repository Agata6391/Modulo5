import React, { useState } from "react";
import ProductItem from "./ProductItem";
import ProductForm from "./ProductForm";

function ProductList({products, dispatch}){
    const [productToEdit, setProductToEdit] = useState(null);
    
    if (products.length ===0) return <p>No hay productos</p>;
    return (
        <div>
            <ProductForm dispatch={dispatch} productToEdit={productToEdit}/>
            {products.map((product)=>(
                <ProductItem
                    key={products.code}
                    product={product}
                    dispatch={dispatch}
                    setProductToEdit={setProductToEdit}
            />
            ))}
        </div>
    );
}
export default ProductList;