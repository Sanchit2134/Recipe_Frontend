import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import useGetUserId from '../Hooks/useGetUserId';

const SavedRecipe = () => {
  const [savedrecipes, setSavedRecipes] = useState([]);
  const userId = useGetUserId();
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userId}`);
        setSavedRecipes(response.data.savedRecipes);
        // console.log(response.data.savedRecipes);
        console.log(response);
      }
      catch (err) {
        console.error(err,"gfghhgfgg");
      }
    }; 
    fetchSavedRecipes();
  },[]);
 
  return (
    <div>
      <h1>Saved Recipe</h1>
      <ul>
        {savedrecipes.map((recipe) => {
          return <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>
            <div>
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} (mintues)</p>
          </li>
        })}
      </ul>
    </div>
  )
}

export default SavedRecipe;


