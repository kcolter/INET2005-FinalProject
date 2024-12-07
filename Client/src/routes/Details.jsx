import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Details(){

    const [productInfo, setProductInfo] = useState([]);
    const { id } = useParams();

    useEffect(() =>{
        async function getProductInfo(){
            const url = import.meta.env.VITE_APP_HOST + "/products/" + id;

            //fetch data from api
            const response = await fetch(url, {method:"GET"});

            if(response.ok){
                const data = await response.json();
                setProductInfo(data);
            }
        }

        getProductInfo();
    }, []);

    var imgURL = "/src/assets/images/" + productInfo.image_filename;

    return (
        <div>
            <h1>Product details for {productInfo.name}</h1>
            <p>{productInfo.description}</p>
            <p>per-unit cost: ${productInfo.cost} CAD</p>
            <img src={imgURL}></img>
            <br></br>
            <Link to="/">Go back</Link>
            <button>Add to cart</button>
        </div>
    );
}