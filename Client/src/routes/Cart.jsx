import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';

export default function Cart() {
    const [cookies, setCookie] = useCookies(['BrickAndMortarCart']);
    const [allProducts, setProducts] = useState([]);

    useEffect(() => {
        async function getAllProducts() {
            const url = import.meta.env.VITE_APP_HOST + "/products/all";

            //fetch data from api
            const response = await fetch(url, { method: "GET" });

            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            }
        }

        getAllProducts();
    }, []);

    var currentCookieVal = "" + cookies.BrickAndMortarCart; //get the cart's cookie

    const cartArray = currentCookieVal.split(','); //split cookie into array

    const itemCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //works since we know only 10 products, in production would make length dynamic from count of products table 
    var positionCount = 0; //to keep track of our position as we .map through

    //similar process as in the products back-end, for each product increment it in the itemCounts
    cartArray.map((item) => {
        itemCounts[item]++;
    });

    var imgURL = "";

    // Return early if products are not yet loaded, researched from GPT
    if (allProducts.length === 0) {
        return <div>Loading...</div>; // Show loading state
    } else {

        return (
            <div>
                <h1>Cart</h1>

                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>

                        {itemCounts.map((item) => {
                            if (item == 0) { //if count is 0, none in cart
                                positionCount++;
                                return; //return nothing, add no row to table
                            } else {
                                positionCount++;
                                return <tr>
                                    {imgURL = "/src/assets/images/" + allProducts[positionCount].image_filename}
                                    <td>{allProducts[positionCount].name}</td>
                                    <td>${allProducts[positionCount].cost}</td>
                                    <td>{item}</td>
                                    <td>{allProducts[positionCount].cost * itemCounts[positionCount]}</td>

                                    <td><img src={imgURL}></img></td>
                                </tr>
                            }

                        })}

                    </tbody>
                </table>


                <Link to="/">Continue Shopping</Link>
                <Link to="/checkout">Complete Purchase</Link>
            </div>
        );
    }
}