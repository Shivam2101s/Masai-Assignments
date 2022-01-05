import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export const ProductDetails = () => {
    const [data,setData] = useState([]);

    useEffect(()=>{
        getData();
    },[])
    
    const {id} = useParams();
     
    const getData = () =>{
        fetch(`http://localhost:3001/products/${id}`)
        .then((d) => d.json())
        .then((res) => {
          setData(res);
          console.log(res);
        });
    }
    
  return (
    <div className="product-details">
      <h1 >{data.title}</h1>
      <div className="detail">
          <img className="productImg" src={data.image} alt="" />
          <div className="description">
              <p><b>Price:</b> $ {data.price}</p>
              <p><b>Description:</b> {data.description}</p>
              <p><b>Category:</b> {data.category}</p>
              <p><b>Rating:</b> {data.rating}</p>
          </div>
      </div>
    </div>
  );
};
