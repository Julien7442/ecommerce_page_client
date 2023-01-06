import { useContext, useState } from "react";
import { Context } from "../../utils/context";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaPinterest,
    FaCartPlus,
} from "react-icons/fa";
import "./SingleProduct.scss";

// The SingleProduct component displays a single product's details and allows the user to add the product to their cart
const SingleProduct = () => {
    // We use the useState hook to store the product quantity and a function to update it
    const [quantity, setQuantity] = useState(1);
  
    // We use the useParams hook to get the product id from the URL parameters
    const { id } = useParams();
  
    // We get the handleAddToCart function from the context to allow us to add the product to the cart
    const { handleAddToCart } = useContext(Context);
  
    // We use the useFetch hook to fetch the product data from the API
    const { data } = useFetch(
      `/api/products?populate=*&[filters][id]=${id}`
    );
  
    // The decrement function decreases the product quantity by 1, unless the quantity is already 1, in which case it does nothing
    const decrement = () => {
      setQuantity((prevState) => {
        if (prevState === 1) return 1;
        return prevState - 1;
      });
    };
    // The increment function increases the product quantity by 1
    const increment = () => {
      setQuantity((prevState) => prevState + 1);
    };
  
    // If the product data has not been fetched yet, we return nothing
    if (!data) return;
    // We destructure the product's attributes from the data object
    const product = data?.data?.[0]?.attributes;
  
    return (
      <div className="single-product-main-content">
        <div className="layout">
          <div className="single-product-page">
            <div className="left">
              {/* We use the REACT_APP_STRIPE_APP_DEV_URL environment variable to generate the product image URL */}
              <img
                src={
                  process.env.REACT_APP_STRIPE_APP_DEV_URL +
                  product.img.data[0].attributes.url
                }
              />
            </div>
            <div className="right">
              {/* We display the product's title, price, and description */}
              <span className="name">{product.title}</span>
              <span className="price">&#8377;{product.price}</span>
              <span className="desc">{product.description}</span>
  
              <div className="cart-buttons">
                {/* The quantity of the product can be increased or decreased using the + and - buttons */}
                            <div className="quantity-buttons">
                                  {/* render a '-' button that, when clicked, calls the decrement function */}
                                <span onClick={decrement}>-</span>
                                <span>{quantity}</span>
                                  {/* render a '+' button that, when clicked, calls the increment function */}
                                <span onClick={increment}>+</span>
                            </div>
                            <button
                                className="add-to-cart-button"
                                  /* when clicked, call the handleAddToCart function with the data and current quantity as arguments, and reset the quantity to 1 */
                                onClick={() => {
                                    handleAddToCart(data?.data?.[0], quantity);
                                    setQuantity(1);
                                }}
                            >
                                {/* render a cart icon and text saying 'ADD TO CART' */}
                                <FaCartPlus size={20} />
                                ADD TO CART
                            </button>
                        </div>
{/* render a horizontal line as a divider */}
                        <span className="divider" />
                        <div className="info-item">
                              {/* render text saying 'Category: ' followed by the title of the first category in the product's categories data */}
                            <span className="text-bold">
                                Category:{" "}
                                <span>
                                    {
                                        product.categories.data[0].attributes
                                            .title
                                    }
                                </span>
                            </span>
                             {/* render text saying 'Share: ' followed by social media icons */}
                            <span className="text-bold">
                                Share:
                                <span className="social-icons">
                                    <FaFacebookF size={16} />
                                    <FaTwitter size={16} />
                                    <FaInstagram size={16} />
                                    <FaLinkedinIn size={16} />
                                    <FaPinterest size={16} />
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
                {/* render the RelatedProducts component, passing it the product id and the id of the first category in the product's categories data as props */}
                <RelatedProducts
                    productId={id}
                    categoryId={product.categories.data[0].id}
                />
            </div>
        </div>
    );
};

export default SingleProduct;
