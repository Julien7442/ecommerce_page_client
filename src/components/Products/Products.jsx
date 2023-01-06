import "./Products.scss";
import Product from "./Product/Product";

// The Products component takes in products, innerPage, and headingText as props
const Products = ({ products, innerPage, headingText }) => {
    return (
      <div className="products-container">
        {/* If innerPage is false, we render the headingText in a div with the class "sec-heading" */}
        {!innerPage && <div className="sec-heading">{headingText}</div>}
        <div className={`products ${innerPage ? "innerPage" : ""}`}>
          {/* We map over the products data and render a Product component for each product */}
          {products?.data?.map((item) => (
            <Product
              key={item.id}
              id={item.id}
              data={item.attributes}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default Products;
