import "./css/GroceryItem.css";

export const GroceryItem =({title,id,RemoveItem}) => {
    return (
        <div className="groceryItem">
        <li className="title">{title}</li>
        <button className="removeBtn" onClick={()=>RemoveItem(id)}>Remove</button>
       </div>
    );
}
