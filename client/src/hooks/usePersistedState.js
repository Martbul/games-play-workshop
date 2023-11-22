import { useState } from "react"

export default function usePersistedState(key,defaultValue){
   const [state,setState] = useState(() =>{
    const persistedState = localStorage.getItem(key)
   
    if(persistedState ){
        return JSON.parse(persistedState)
    }

return defaultValue
})
   
//! ne go polzvaj za cookie . te se setvat ot servera
   const setPersistedState = (value) =>{
    
        setState(value)
        //serialized = in text format
        let serializedValue;
        
        if(typeof value === 'function'){
             serializedValue = JSON.stringify(value(state))
        
        }else{
            serializedValue = JSON.stringify(value)
        
        }


       
        localStorage.setItem(key, serializedValue)
   }
    return[
            state,
            setPersistedState        
    ]
}