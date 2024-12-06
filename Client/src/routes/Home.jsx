import { useEffect, useState } from "react";

export default function Home(){
    const [products, setProducts] = useState(null);

    useEffect(() =>{
        async function getAllProducts(){
            const url = import.meta.env.VITE_APP_HOST + "/products/all";

            const response = await fetch(url, {method:"GET"});

            if(response.ok){
                const data = await response.json();
                setProducts(data);
            }
            // .then((res) => {
            //     return res.json();
            // }).then((data) =>{
            //     setProducts(data);
            //     //console.log(data);
            // });
        }

        getAllProducts();
        console.log(products);
    }, []);

    return (
        <div>
            <h1>Home</h1>

            <table>
                <tr>
                    <th>Product Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Image</th>
                </tr>


            {products.map((item) => {
                return <tr><td>{item.name}</td><td>{item.description}</td><td>${item.cost}</td><td><img src="./"></img></td></tr> ;
            })}

        </table> 
        
        </div>
    );
}