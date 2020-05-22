import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const ModalContext = createContext();

const ModalProvider = (props) => {

    const [idRecipe,setIdRecipe] = useState(null);
    const [selectedRecipe,setSelectedRecipe] = useState({});

    useEffect(() => {
        if(!idRecipe) return;
        const getRecipe = async () => {
            const url =`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`;
            const result = await axios.get(url);
            setSelectedRecipe(result.data.drinks[0]);
        }
        getRecipe();
    },[idRecipe])

    return(
        <ModalContext.Provider
            value={{
                setIdRecipe,
                selectedRecipe,
                setSelectedRecipe
            }}
        >
            {props.children}
        </ModalContext.Provider>
    )
}
export default ModalProvider;