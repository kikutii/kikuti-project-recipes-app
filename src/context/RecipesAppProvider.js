import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from './RecipesAppContext';
import useFoodsAndDrinks from '../hooks/useFoodsAndDrinks';
import useFilter from '../hooks/useFilter';
import useStoredState from '../hooks/useStoredState';

export default function RecipesAppProvider({ children }) {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [filters, setFilters] = useState({ recipesLimit: 12 });
  const [renderItems, setRenderItems] = useState(false);
  const [filterButtons, setFilterButtons] = useState([]);
  const [inProgress, setInProgress] = useState({ cocktails: {}, meals: {} });
  const [favorites, setFavorites] = useStoredState('favoriteRecipes', []);
  const [done, setDone] = useStoredState('doneRecipes', []);
  const [dateDone, setDateDone] = useStoredState('doneDates', []);
  // const [done, setDone] = useState([]);
  // const [dateDone, setDateDone] = useState([]);

  const [savedFilters, setSavedFilters] = useState({
    filterBySearch: '',
    filterByRadio: '',
  });

  // hooks costumizados, o useFoodsAndDrinks faz a requisição das comidas e bebidas
  // e o useFilter ele filtra as comidas e bebidas baseadas na seleção do usuário
  const [foods, drinks, setFoods, setDrinks] = useFoodsAndDrinks();
  const [
    filteredFoods,
    filteredDrinks,
    setFilteredFoods,
    setFilteredDrinks,
  ] = useFilter(foods, drinks, filters, savedFilters);

  const [endPoints, setEndPoints] = useState({
    endpoint1: '',
    endpoint2: '',
    endpoint3: '',
  });

  const context = {
    login,
    setLogin,
    foods,
    setFoods,
    filteredFoods,
    drinks,
    setDrinks,
    filteredDrinks,
    filters,
    setFilters,
    renderItems,
    setRenderItems,
    savedFilters,
    setSavedFilters,
    setFilteredFoods,
    setFilteredDrinks,
    endPoints,
    setEndPoints,
    filterButtons,
    setFilterButtons,
    inProgress,
    setInProgress,
    favorites,
    setFavorites,
    done,
    setDone,
    dateDone,
    setDateDone,
  };

  return (
    <RecipesAppContext.Provider value={ context }>
      { children }
    </RecipesAppContext.Provider>
  );
}

RecipesAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
