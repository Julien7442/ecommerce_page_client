import { useEffect } from "react";
import { createContext, useState } from "react";
import { useLocation } from "react-router-dom";

// Create context to be shared between components
export const Context = createContext();

const AppContext = ({ children }) => {
  // State to store categories data
  const [categories, setCategories] = useState();
  // State to store products data
  const [products, setProducts] = useState();
  // State to store the visibility of the cart
  const [showCart, setShowCart] = useState(false);
  // State to store the items in the cart
  const [cartItems, setCartItems] = useState([]);
  // State to store the count of items in the cart
  const [cartCount, setCartCount] = useState(0);
  // State to store the subtotal of the items in the cart
  const [cartSubTotal, setCartSubTotal] = useState(0);
  // Hook to get the current location
  const location = useLocation();

  // Scroll to top of the page when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Update cartCount and cartSubTotal when cartItems change
  useEffect(() => {
    let count = 0;
    // Calculate count of items in cart
    cartItems?.map((item) => (count += item.attributes.quantity));
    setCartCount(count);

    let subTotal = 0;
    // Calculate subtotal of items in cart
    cartItems.map(
      (item) =>
        (subTotal += item.attributes.price * item.attributes.quantity)
    );
    setCartSubTotal(subTotal);
  }, [cartItems]);

  // Function to add a product to the cart
  const handleAddToCart = (product, quantity) => {
    let items = [...cartItems];
    let index = items?.findIndex((p) => p.id === product?.id);
    if (index !== -1) {
      // If product is already in the cart, increase its quantity
      items[index].attributes.quantity += quantity;
    } else {
      // Otherwise, add the product to the cart with the specified quantity
      product.attributes.quantity = quantity;
      items = [...items, product];
    }
    setCartItems(items);
  };

  // Function to remove a product from the cart
  const handleRemoveFromCart = (product) => {
    let items = [...cartItems];
    // Filter out the product to be removed
    items = items?.filter((p) => p.id !== product?.id);
    setCartItems(items);
  };

  const handleCartProductQuantity = (type, product) => {
    let items = [...cartItems];
    let index = items?.findIndex((p) => p.id === product?.id);
    // Check if type is 'inc' or 'dec' and update quantity of product in cart accordingly
    if (type === "inc") {
        items[index].attributes.quantity += 1;
    } else if (type === "dec") {
        // Don't allow quantity to go below 1
        if (items[index].attributes.quantity === 1) return;
        items[index].attributes.quantity -= 1;
    }
    setCartItems(items);
};

    return (
        <Context.Provider
            value={{
                products,
                setProducts,
                categories,
                setCategories,
                cartItems,
                setCartItems,
                handleAddToCart,
                cartCount,
                handleRemoveFromCart,
                showCart,
                setShowCart,
                handleCartProductQuantity,
                cartSubTotal,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default AppContext;
