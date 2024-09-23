export const initialState=[];
export default function reducer(state,action){
    switch(action.type){
        case 'ADD_PRODUCT':
            return [...state,action.payload];
        case 'EDIT_PRODUCT':
            return state.map((product) => 
                product.code ===action.payload.code ? action.payload : product
        );
        case 'DELETE_PRODUCT':
            return state.filter((product) => product.code !== action.payload);
            
        default:
            return state;    
    }
}