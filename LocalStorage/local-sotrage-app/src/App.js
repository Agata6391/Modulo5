import React,{useReducer,useEffect} from "react";
import ProductForm from "./Components/ProductForm";
import ProductList from "./Components/ProductList";
import reducer,{initialState} from "./reducer"

function App(){
  const [state,dispatch] = useReducer(reducer,initialState,()=>{
    const localData = localStorage.getItem("products");
    return localData ? JSON.parse(localData):initialState;
    });
//guardando data en local 

useEffect(() => {
  localStorage.setItem("products", JSON.stringify(state));
},[state]);
return (
<div className="app-container">
  <h1>Gestion de productos</h1>
  <ProductForm dispatch={dispatch}/>
  <ProductList products={state} dispatch={dispatch}/>
</div>

);
}
export default App;
