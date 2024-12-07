import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Details(){

    const [productInfo, setProductInfo] = useState([]);

    const { id } = useParams();

    useEffect(() =>{
        async function getProductInfo(){
            const url = import.meta.env.VITE_APP_HOST + "/products/" + id;
            console.log(url);

            //fetch data from api
            const response = await fetch(url, {method:"GET"});

            if(response.ok){
                const data = await response.json();
                setProductInfo(data);
            }
        }

        getProductInfo();
        console.log(productInfo);
    }, []);

    return (
        <div>
            <h1>Details for product id {id}</h1>
        </div>
    );
}