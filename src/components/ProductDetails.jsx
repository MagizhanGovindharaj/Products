import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

function ProductDetails() {
    let [content, setContent] = useState();
    let navigateToProducts = useNavigate();
    let { pid } = useParams();

    let getData = async () => {
        try {
            let { data } = await axios.get(`https://fakestoreapi.com/products/${pid}`);
            console.log(data);
            setContent(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    console.log(content);

    return (
        <div id="details">
            <img id='img' src={content?.image} alt="Image Not Found" title='Image' />
            <aside id='content'>
                <h1>Category: <span>{content?.category}</span></h1>
                <h1>Title: <span>{content?.title}</span></h1>
                <h1>Description: <span>{content?.description}</span></h1>
                <h1>Price: <span>${content?.price}</span></h1>
                <h1>Ratings: <span>{content?.rating.rate}</span></h1>
                <span style={{ display: "flex", gap: "20px" }}>
                    <button className="action-button">Add To Cart</button>
                    <button className="action-button">Buy Now</button>
                </span>
                <button id='back' onClick={() => { navigateToProducts('/') }}>Back to Products</button>
            </aside>
        </div>
    );
}

export default ProductDetails;
