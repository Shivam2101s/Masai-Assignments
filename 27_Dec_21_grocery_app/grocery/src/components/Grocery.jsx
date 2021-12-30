import { useState } from "react";
import { GroceryInput } from "./GroceryInput";
import { GroceryItem } from "./GroceryItem";
import { nanoid } from "nanoid";
import "./css/Grocery.css";

export const Grocery = () => {
  const [list, setList] = useState([]);

  const getData = (data) => {
    console.log("Grocery List:", data);
    const payload = {
      title: data,
      id: nanoid(7),
    };
    setList([...list, payload]);
  };

  const RemoveItem = (id) => {
    list.splice(
      list.findIndex((e) => e.id === id),
      1
    );
    setList([...list]);
  };

  return (
    <div className="grocery">
      <h3>Grocery List</h3>
      <GroceryInput getData={getData} />
      <div id="listDiv">
      {list.map((e) => (
        <GroceryItem key={e.id} {...e} RemoveItem={RemoveItem} />
      ))}
      </div>
     
    </div>
  );
};
