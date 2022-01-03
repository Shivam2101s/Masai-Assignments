import { useState } from 'react';
import './App.css';
import {Input, Div} from './components/styled_components'

function App() {

  const [title,setTitle] = useState("");
  const [ingredient,setIngredient] = useState("")
  const [recipe, setRecipe] = useState([]);

  const getRecipe = () => {
    fetch(`http://localhost:3002/recipe`,{
      method: "GET"
    })
      .then((d) => d.json())
      .then((res) => {
        setRecipe(res);
      });
  };

  
  const addRecipe = (e) => {
  const payload = {
    title:title,
     
  };
  fetch("http://localhost:3002/recipe", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "content-type": "application/json",
    },
  }).then(()=>{
     getRecipe()
      setTitle("");
  })
};

console.log(recipe);
  return (
   
    <div className="App">
      <h1>Cook@Home</h1>
      <div className="container">
      <Div>
      <h2>Add Recipe</h2>
    <Input id="title" value={title} type="text"
        onChange={(e) => {
          setTitle(e.target.value);
        }} placeholder="Title"/>
    <Input id="ingredients" value={ingredient} onChange={(e) => {
          setIngredient(e.target.value);
        }}  placeholder=" Ingredients" required/>
    <Input id="time" placeholder="Time to cook" required/> 
    <Input type="file" placeholder="Image" required/>
    <Input id="instructions" placeholder="Instructions" required/>
    <Input id="submit" type="submit" value="Submit" onSubmit={addRecipe} required/>
    </Div>

   <Div>
<h2>Recipes</h2>
{recipe.map((e) => (
        <div>{e.title}</div>
      ))}
   </Div>
      </div>
   
   <div id="recipe">
     <h2>Description</h2>
   </div>
    </div>
  );
}

export default App;
