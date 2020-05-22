import React, {useContext, useState} from 'react';
import {CategoriesContext} from '../context/CategoriesContext';
import {RecipesContext} from '../context/RecipesContext';

const Form = () => {

    const [search, setSearch] = useState({
        ingredient: '',
        category: ''
    })

    const {categories} = useContext(CategoriesContext);
    const {setSearchRecipe, setRequest} = useContext(RecipesContext);

    const handleChange = e => {
        setSearch({
            ...search,
            [e.target.name] : e.target.value
        })
    }

    return ( 
        <form
            className='col-12'
            onSubmit={e => {
                e.preventDefault();
                setSearchRecipe(search);
                setRequest(true);
            }}
        >
            <fieldset className="text-center">
                <legend>Busca bebidas por categoria o Ingrediente</legend>
            </fieldset>

            <div className="row mt-4">
                <div className="col-md-4">
                    <input
                        name="ingredient"
                        className="form-control"
                        type="text"
                        placeholder="Ingrediente..."
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-4">
                    <select
                        name="category"
                        className="form-control"
                        onChange={handleChange}
                    >
                        <option value="">-- Selecciona Categoria --</option>
                        {categories.map(category => (
                            <option key={category.strCategory} value={category.strCategory}>{category.strCategory}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-4">
                    <input
                        className="btn btn-block btn-primary"
                        type="submit"
                        value="Buscar Bebidas"
                    />
                </div>
            </div>
        </form>
     );
}
 
export default Form;