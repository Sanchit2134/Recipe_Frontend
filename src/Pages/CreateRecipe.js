import { useState } from 'react';
import axios from 'axios';
import useGetUserId from '../Hooks/useGetUserId';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const CreateRecipe = () => {
  const userID = useGetUserId();
  const [cookies, _] = useCookies(['access_token']);
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: [],
    instruction: '',
    imageUrls: '',
    cookingTime: 0,
    userOwner: userID
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({
      ...recipe, [name]: value
    })
  }
  const addIngredient = (e) => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ''] })
  }
  const handleIngredientChange = (e, idx) => {
    const { value } = e.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients });
    // console.log(recipe);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(recipe);
    try {
      await axios.post('http://localhost:3001/recipe', recipe, {headers:{'Authorization': cookies.access_token}});
      alert('Recipe Created Successfully');
      navigate('/');
    }
    catch (err) {
      console.error(err)
    }
  };

  return (
    <div>
      <h1>Create Recipe</h1>
      <form className='form-CR' onSubmit={onSubmit}>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          name='name'
          onChange={handleChange} />
        <label htmlFor='ingredients'>Ingredients</label>
        {recipe.ingredients.map((ingredient, idx) => (
          <input
          key={idx}
          type='text'
          name='ingredients'
          value={ingredient}
          onChange={(e)=>handleIngredientChange(e,idx)}
        />)
        )}
        <button onClick={addIngredient} type='button'>Add Ingrident</button>
        <label htmlFor='instruction'>Instruction</label>
        <textarea
          id='instruction'
          name='instruction'
          onChange={handleChange}
        >
        </textarea>
        <label htmlFor='imageUrls'>Image</label>
        <input
          type='text'
          id='imageUrls'
          name='imageUrls'
          onChange={handleChange}
        />
        <label htmlFor='cookingTime'>Cooking Time</label>
        <input
          type='number'
          id='cookingTime'
          name='cookingTime'
          onChange={handleChange}
        />
        <button type='submit'>Create Recipe</button>
      </form>
    </div>
  )
}

export default CreateRecipe




