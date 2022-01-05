import { useEffect, useState } from "react"
import {Link} from "react-router-dom";

export const Products = () => {
const [data,setData] = useState([]);

useEffect(()=>{
    getData();
},[])

    const getData = () =>{
        fetch("http://localhost:3001/products")
        .then((d) => d.json())
        .then((res) => {
          setData(res);
        });
    }

return <div id="container">
        {data.map((e, i) => (
             <Link  key={i}  className="productLink" to={`/products/${e.id}`}>
              <div className="productDiv">
            <img src={e.image} alt="https://w7.pngwing.com/pngs/998/203/png-transparent-black-and-white-no-to-camera-logo-video-on-demand-retail-website-simple-no-miscellaneous-television-text.png" />
            <p className="productTitle">{e.title}</p>
            <p className="productPrice">$ {e.price}</p> 
            </div>
             </Link>
           

        ))}
    </div>
}