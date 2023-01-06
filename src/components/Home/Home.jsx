import React, { useEffect, useContext } from "react";
import "./Home.scss";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Products from "../Products/Products";
import { fetchDataFromApi } from "../../utils/api";
import { Context } from "../../utils/context";

const Home = () => {
    // destructure the products, setProducts, categories, and setCategories functions from the Context object
    const { products, setProducts, categories, setCategories } =
      useContext(Context);
  
    // use the useEffect hook to call the getProducts and getCategories functions when the component is mounted
    useEffect(() => {
      getProducts();
      getCategories();
    }, []);
  
    // define the getProducts function, which fetches products data from the API and sets it in the context
    const getProducts = () => {
      fetchDataFromApi("/api/products?populate=*").then((res) => {
        setProducts(res);
      });
    };
  
    // define the getCategories function, which fetches categories data from the API and sets it in the context
    const getCategories = () => {
      fetchDataFromApi("/api/categories?populate=*").then((res) => {
        setCategories(res);
      });
    };
  
    // render the Banner, Category, and Products components
    return (
      <div>
        <Banner />
        <div className="main-content">
          <div className="layout">
            <Category categories={categories} />
            <Products
              headingText="Popular Products"
              products={products}
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default Home;
