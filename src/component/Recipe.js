import React, {useContext, useState} from 'react';
import {ModalContext} from '../context/ModalContext';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Recipe = ({recipe}) => {

    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    
    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const { selectedRecipe, setIdRecipe, setSelectedRecipe } = useContext(ModalContext);

    const showIngredients = selectedRecipe => {
        let ingredients = [];
        for(let i = 1; i < 16; i++) {
            if( selectedRecipe[`strIngredient${i}`]) {
                console.log(selectedRecipe[`strIngredient${i}`]);
                ingredients.push(
                    <li>
                        {selectedRecipe[`strIngredient${i}`]} {selectedRecipe[`strMeasure${i}`]}
                    </li>
                )
            }
        }
        return ingredients;
    }

    return ( 
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{recipe.strDrink}</h2>

                <img className="card-img-top" src={recipe.strDrinkThumb} alt={`Imagen de ${recipe.strDrink}`}/>

                <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={() => {
                            setIdRecipe(recipe.idDrink);
                            handleOpen();
                        }}
                    >
                        Ver Receta
                    </button>

                    <Modal
                        open={open}
                        onClose={() => {
                            setIdRecipe(null);
                            setSelectedRecipe({});
                            handleClose();
                        }}
                    >
                        <div className={classes.paper} style={modalStyle}>
                            <h2>{selectedRecipe.strDrink}</h2>
                            <h3 className="mt-4">Instrucciones</h3>
                            <p>
                                {selectedRecipe.strInstructions}
                            </p>

                            <img className="img-fluid my-4" src={selectedRecipe.strDrinkThumb} />
                            <h3>Ingredientes y cantidades</h3>
                            <ul>
                                {showIngredients(selectedRecipe)}
                            </ul>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
     );
}
 
export default Recipe;