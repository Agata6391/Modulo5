import React, {useState, useEffect }from "react";

function ProductForm ({dispatch, productToEdit}){
    const [product, setProduct] = useState({name:'', code :'',price:''});
    const [isEditing, setIsEditing]= useState(false);
   
    useEffect (()=>{
        if(productToEdit){
            setProduct(productToEdit);
            setIsEditing(true);
        }
    },[productToEdit]);

    const handleSubmit=(e)=>{
        e.preventDefault();
        
        if(product.price <= 0 ){
            alert('El precio no puiede ser menor a 0 o igual')
            return;
        }
        if(isEditing){
            dispatch({ type:'EDIT_PRODUCT', payload:product });
        }else{
            dispatch({ type:'ADD_PRODUCT', payload:product });
        }
        setProduct({name:'', code :'',price:''});
        setIsEditing(false);
      
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder='Producto'
            value={product.name}
            onChange={(e)=>setProduct({...product,name:e.target.value})}
            required 
            />
             <input
            type="text"
            placeholder='code'
            value={product.code}
            onChange={(e)=>setProduct({...product,code:e.target.value})}
            required 
            />
             <input
            type="text"
            placeholder='price'
            value={product.price}
            onChange={(e)=>setProduct({...product,price:e.target.value})}
            required 
            />
            <button type="submit">{isEditing ? 'Editar':'Agregar'}</button>

        </form>
    );  
}
export default ProductForm;
