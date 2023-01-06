import React from "react";
import { useNavigate } from "react-router-dom";
import "./Product.scss";

// The Product component takes in data and an id for a product as props
const Product = ({ data, id }) => {
      // useNavigate is a hook that allows us to programmatically navigate to a new route
    const navigate = useNavigate();
    return (
            // When the product card is clicked, we navigate to the product page for this product
        <div
            className="product-card"
            onClick={() => navigate("/product/" + id)}
        >
            <div className="thumbnail">
                {/* We use the REACT_APP_STRIPE_APP_DEV_URL environment variable to generate the product image URL */}
                <img
                    src={
                        process.env.REACT_APP_STRIPE_APP_DEV_URL +
                        data.img.data[0].attributes.url
                    }
                />
            </div>
            <div className="prod-details">
                {/* We display the product's title and price */}
                <span className="name">{data.title}</span>
                <span className="price">&#8377;{data.price}</span>
            </div>
        </div>
    );
};

export default Product;
