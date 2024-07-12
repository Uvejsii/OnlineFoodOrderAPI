import CartItems from "../components/CartItems";
import GoToAdminPageButton from "../components/GoToAdminPageButton";

const Cart = () => {
  return (
    <>
      <GoToAdminPageButton />
      <CartItems />
    </>
  );
};

export default Cart;
