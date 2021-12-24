import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const addOne = (value) => {
    setCount(count+value);
  };
  const double = () => {
    setCount(count*2)
  }
  const reset = () => {
    setCount(0)
  }

  return (
  <div className="body">  
    <div className="App">
      <h3>Counter: {count}</h3>

      <div>
        <button onClick={() => addOne(1)}>Increment</button>
        <button onClick={() => addOne(-1)}>Decrement</button>
        <button onClick={double}>Double</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
    </div>
  );
}

export default App;
