import { useState } from "react";
import "./css/GroceryInput.css";

export const GroceryInput = ({ getData }) => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const hadleClick = () => {
    if (text !== "") {
      getData(text);
      setText("");
    } else {
      alert("Please Enter something");
    }
  };

  return (
    <div className="main">
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Add items..."
      />
      <button id="addBtn" onClick={hadleClick}>
        Add item
      </button>
    </div>
  );
};
