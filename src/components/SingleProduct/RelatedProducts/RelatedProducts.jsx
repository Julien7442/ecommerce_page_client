import React from "react";
import useFetch from "../../../hooks/useFetch";
import Products from "../../Products/Products";

const RelatedProducts = ({ categoryId, productId }) => {
    // use the useFetch hook to fetch data from the specified API endpoint, passing it the appropriate parameters as a query string
    const { data } = useFetch(
      `/api/products?populate=*&filters[id][$ne]=${productId}&filters[categories][id]=${categoryId}&pagination[start]=0&pagination[limit]=4`
    );
  
    // render the Products component, passing it the fetched data as a prop and setting the heading text to 'Related Products'
    return (
      <div className="related-products">
        <Products headingText="Related Products" products={data} />
      </div>
    );
  };
  
  export default RelatedProducts;