import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function Home() {
    const [products, setProducts] = useState([]);

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

    return (
        <div>
            <h1>Home</h1>

            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>See Details</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item) => {
                        var thisDetails = "/details/" + item.product_id;
                        var thisPic = "./src/assets/images/" + item.image_filename;

                        return <tr><td>{item.name}</td><td>{item.description}</td>
                            <td>${item.cost}</td>
                            <td><img src={thisPic} className="img-fluid"></img></td>
                            <td><Link to={thisDetails}>Details for {item.name}</Link></td>
                        </tr>;
                    })}

                </tbody>
            </table>
        </div>
    );
}