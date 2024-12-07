import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
export default function Details() {

    const [cookies, setCookie] = useCookies(['BrickAndMortarCart']);
    const [productInfo, setProductInfo] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        async function getProductInfo() {
            const url = import.meta.env.VITE_APP_HOST + "/products/" + id;

            //fetch data from api
            const response = await fetch(url, { method: "GET" });

            if (response.ok) {
                const data = await response.json();
                setProductInfo(data);
            }
        }

        getProductInfo();
    }, []);

    async function AddProductToCart() {

        var currentCookieVal = "" + cookies.BrickAndMortarCart; //get existing cookie
        console.log(currentCookieVal);

        //if-logic to avoid having 'undefined' as first cart entry
        if (currentCookieVal != "undefined") {
            currentCookieVal += "," + productInfo.product_id; //append this products id
            setCookie('BrickAndMortarCart', currentCookieVal, { path: '/', maxAge: 3600 }) //re-set the cookie, timer is 1hr  
        } else {
            setCookie('BrickAndMortarCart', "" + productInfo.product_id, { path: '/', maxAge: 3600 }); //if cookie is null, set it for the first time
        }
    }

    var imgURL = "/src/assets/images/" + productInfo.image_filename;
    return (
        <div>
            <h1>Product details for {productInfo.name}</h1>
            <p>{productInfo.description}</p>
            <p>per-unit cost: ${productInfo.cost} CAD</p>
            <img src={imgURL}></img>
            <br></br>
            <Link to="/">Go back</Link>
            <button onClick={AddProductToCart}>Add to cart</button>
        </div>
    );
}