import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useGetUserId from '../Hooks/useGetUserId';
import { useCookies } from 'react-cookie';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies] = useCookies(['access_token']);
  const userID = useGetUserId();

  useEffect(() => {
    const fetchRecipes = async () => {
      console.log('User ID:', userID);
      try {
        const response = await axios.get(`https://recipe-backend-six.vercel.app/recipe//all_recipies_of_a_user//${userID}`);
        if (Array.isArray(response.data)) {
          setRecipes(response.data);
          console.log('response.data: ', response.data);
          // console.log('Fetched Recipes:', response.data);
          response.data.forEach(recipe => {
            console.log('Recipe Image URLs:', recipe.imageUrls);
          });
        } else {
          console.error('Expected an array for recipes:', response.data);
        }
      } catch (err) {
        console.error('Error fetching recipes:', err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(`https://recipe-backend-six.vercel.app/recipe/savedRecipes/${userID}`);
        if (Array.isArray(response.data.savedRecipes)) {
          setSavedRecipes(response.data.savedRecipes);
          // console.log('Fetched Saved Recipes:', response.data.savedRecipes);
          response.data.savedRecipes.forEach(recipe => {
            console.log('Saved Recipe Image URLs:', recipe.imageUrls);
          });
        } else {
          console.error('Expected an array for saved recipes:', response.data.savedRecipes);
        }
      } catch (err) {
        console.error('Error fetching saved recipes:', err);
      }
    };

    if (userID) fetchRecipes();
    if (cookies.access_token && userID) fetchSavedRecipes();
  });

  const saveRecipe = async (recipeId,userID) => {
    try {
      //console.log('Saving Recipe:', recipeId, userID);
      const response = await axios.put('https://recipe-backend-six.vercel.app/recipe', { recipeId, userID }, { headers: { authorization: cookies.access_token } });
      if (Array.isArray(response.data.savedRecipes)) {
        setSavedRecipes(response.data.savedRecipes);
      } else {
        console.error('Expected an array for updated saved recipes:', response.data.savedRecipes);
      }
      //console.log('Saved Recipe Response:', response);
    } catch (err) {
      console.error('Error saving recipe:', err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.some(recipe => recipe._id === id);

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {Array.isArray(recipes) && recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button onClick={() => saveRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)}>
                {isRecipeSaved(recipe._id) ? 'Saved' : 'Save'}
              </button>
            </div>
            <div>
              <p>{recipe.instruction}</p> {/* Corrected the typo here */}
            </div>
            <div>
              {Array.isArray(recipe.imageUrls) && recipe.imageUrls.map((url, index) => (
                <img key={index} src={url} alt={recipe.name} style={{ maxWidth: '200px', margin: '5px' }} />
              ))}
            </div>
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
