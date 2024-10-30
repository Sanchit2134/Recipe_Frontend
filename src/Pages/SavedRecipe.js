import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useGetUserId from '../Hooks/useGetUserId';
import { useCookies } from 'react-cookie';

const SavedRecipes = () => {
  const userID = useGetUserId();
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(()=>{
      const fetchSavedRecipe = async ()=>{
      try{
        const response = await axios.get(`http://localhost:3001/recipe/savedRecipes/${userID}`,{userID});
        setSavedRecipes(response.data.savedRecipes);
      }catch(err){
        console.error(err);
      }
    };
    fetchSavedRecipe()
  },[])


  return(
    <div>
    <h1>Saved Recipes</h1>
    <ul>
      {savedRecipes.map((recipe) => (
        <li key={recipe._id}>
          { savedRecipes.includes(recipe._id) && <h1>Already Saved</h1>}
          <div>
            <h2>{recipe.name}</h2>
          </div>
          <div className='instruction'>   
            <p>{recipe.instruction}</p>
          </div>
          <div>
           <img src={recipe.imageUrl} alt={recipe.name} />
          </div>
          <p>Cooking Time: {recipe.cookingTime} minutes</p>
        </li>
      ))}
    </ul>
  </div>
  )
};

export default SavedRecipes;


