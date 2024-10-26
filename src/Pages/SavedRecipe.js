import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useGetUserId from '../Hooks/useGetUserId';

const SavedRecipe = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserId();

  useEffect(() => {
    if (userID) { // Ensure userID exists before making the request
      const fetchSavedRecipes = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`);
          setSavedRecipes(response.data.savedRecipes);
        } catch (err) {
          console.error('Error fetching saved recipes: ', err);
          alert('Failed to fetch saved recipes. Please try again later.');
        }
      };
      fetchSavedRecipes();
    }
  }, [userID]); // Only fetch recipes when userID changes or is available

  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.length > 0 ? (
          savedRecipes.map((recipe) => (
            <li key={recipe._id}>
              <div>
                <h2>{recipe.name}</h2>
              </div>
              <div>
                <p>{recipe.instructions}</p>
              </div>
              <img src={recipe.imageUrl} alt={recipe.name} />
              <p>Cooking Time: {recipe.cookingTime} minutes</p>
            </li>
          ))
        ) : (
          <p>No saved recipes found.</p>
        )}
      </ul>
    </div>
  );
};

export default SavedRecipe;
