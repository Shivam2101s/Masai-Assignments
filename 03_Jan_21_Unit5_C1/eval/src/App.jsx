import { useEffect, useState } from 'react';
import './App.css';
import {Input, Div,Div1} from './components/styled_components'

function App() {

  const [recipe,setRecipe] = useState([]);
  const [form , setForm] = useState({     
    title:"",
    ingredients:"",
    time:"",
    image:"",
    instructions:"",
});


 useEffect(() => {
    getRecipe();
  }, []);

  const getRecipe = () => {
    fetch(`http://localhost:3002/recipe`,{
      method: "GET"
    })
      .then((d) => d.json())
      .then((res) => {
        setRecipe(res);
      });
  };

  const handleChange=(e)=>{
        
    const {name, value} = e.target;

    setForm({
        ...form,
        [name]: value,
    });
 }

  
  const addRecipe = (e) => {
    console.log(form)
    e.preventDefault();
  const payload = form;
  fetch("http://localhost:3002/recipe", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "content-type": "application/json",
    },
  }).then(()=>{
     getRecipe()
      setForm("");
  })
};



const detail=(id) => {
  fetch(`http://localhost:3002/recipe/${id}`)
  .then((d) => d.json())
  .then((res)=>{
   
  })
}

  return (

    <div className="App">
      <h1>Cook@Home</h1>
      <div className="container">
      <Div>
      <h2>Add Recipe</h2>
      <form onSubmit={addRecipe}>
    <Input name="title"  type="text" onChange={handleChange} placeholder="Title"/>
    <Input name="ingredients"  onChange={handleChange} placeholder=" Ingredients" required/>
    <Input name="time"  onChange={handleChange} placeholder="Time to cook" required/> 
    <Input name="image" type="file"  onChange={handleChange} placeholder="Image" />
    <Input name="instructions"  onChange={handleChange} placeholder="Instructions" required/>
    <Input id="submit"  onChange={handleChange} type="submit" value="Submit" required/>
    </form>
    </Div>

   <Div1 id="collection">
<h2>Recipes</h2>
{recipe.map((e) => (
        <li >{e.title}</li>
      ))}
   </Div1>
      </div>
   
   <div id="recipe">
     <h2>Description</h2>

   </div>
    </div>
  );
}

export default App;
