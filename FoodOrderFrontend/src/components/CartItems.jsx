import { useEffect, useState } from "react";

const CartItems = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const res = await fetch("http://localhost:5071/getAllAddedItems", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setCartItems(data);
    };
    fetchCartItems();
  }, []);
  return (
    <>
      {cartItems.map((item, index) => (
        <div key={index}>
          {console.log(item)}
          <p>ID: {item.productId}</p>
          <img src={item.imageUrl} alt="" />
          <h5>Name: {item.name}</h5>
          <p>Price: € {item.price}</p>
          <p>QTY: {item.quantity}</p>
          <p>Type: {item.productType}</p>
          <hr />
        </div>
      ))}
    </>
  );
};

export default CartItems;
