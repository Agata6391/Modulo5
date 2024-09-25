import React from "react";


function ProductItem({product, dispatch, setProductToEdit}){
    const handleDelete=()=>{
        dispatch({type:'DELETE_PRODUCT',payload:product.code});
    }
    const handleEdit = ()=>{
        setProductToEdit(product);
    }
    return(
        <div className="product-item">
            <span>{product.name}</span>
            <span>{product.code}</span>
            <span>{product.price}</span>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleEdit}>Editar</button>
        </div>
    );

}
export default ProductItem;