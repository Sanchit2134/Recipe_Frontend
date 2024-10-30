import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useGetUserId from '../Hooks/useGetUserId';
import { useCookies } from 'react-cookie';

const Home = () => {
  const userID = useGetUserId();
  const [recipes, setRecipe] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies,_] = useCookies(['access_token']);
  useEffect(()=>{
    const fetchRecipe = async ()=>{
      try{
        const response = await axios.get('http://localhost:3001/recipe');
        setRecipe(response.data);
      }catch(err){
        console.error(err);
      }
    };

    const fetchSavedRecipe = async ()=>{
      try{
        const response = await axios.get(`http://localhost:3001/recipe/savedRecipes/ids/${userID}`,{userID});
        setSavedRecipes(response.data.savedRecipes);
        // console.log(response.data.SavedRecipes);
      }catch(err){
        console.error(err);
      }
    };
    fetchRecipe();
    if(cookies.access_token) fetchSavedRecipe()
  },[])

  const saveRecipe = async(recipeID)=>{
    try {
      const response = await axios.put('http://localhost:3001/recipe',{userID,recipeID},{headers:{'Authorization': cookies.access_token}});
      setSavedRecipes(response.data.savedRecipes) 
    } catch (err) { 
      console.log(err)
    }
  }

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return(
    <div>
    <h1>Recipes</h1>
    <ul>
      {recipes.map((recipe) => (
        <li key={recipe._id}>
          { savedRecipes.includes(recipe._id) && <h1>Already Saved</h1>}
          <div>
            <h2>{recipe.name}</h2>
            <button onClick={()=>saveRecipe(recipe._id)}
            disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? 'Saved' : 'Save'}
              </button>
          </div>
          <div className='instruction'>   
            <p>{recipe.instruction}</p>
          </div>
          <div>
           <img src={recipe.imageUrl} alt='image' />
          </div>
          <p>Cooking Time: {recipe.cookingTime} minutes</p>
        </li>
      ))}
    </ul>
  </div>
  )
};

export default Home;


