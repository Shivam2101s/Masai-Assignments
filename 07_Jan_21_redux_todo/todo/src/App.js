import './App.css';
import {Todo} from './components/Todo'

function App() {
  return (
    
    <div className="App">
      <header>
       <img src='https://learn.masaischool.com/img/logo-navbar.svg'/>  todos  
      </header>
      <Todo/>
    </div>
  );
}

export default App;
