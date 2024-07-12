import DeleteFoodButton from "./DeleteFoodButton";
import EditFoodButton from "./EditFoodButton";
import AddToCartButton from "./AddToCartButton";

const FoodListing = ({ food, goToFood, isHomePage }) => {
  const onGoToFood = (foodId) => {
    goToFood(foodId);
  };

  return (
    <>
      <div className="col">
        <div className="card food-card">
          <img
            src={food.imageUrl}
            alt={`${food.name} image`}
            className="card-img-top img-fluid"
            onClick={() => {
              onGoToFood(food.id);
            }}
          />
          <div className="card-body">
            <h5
              onClick={() => {
                onGoToFood(food.id);
              }}
            >
              {food.name}
            </h5>
          </div>
          <div className="card-footer d-flex justify-content-between gap-3">
            {isHomePage ? (
              <div className="d-flex flex-column gap-2 w-100">
                <div className="d-flex justify-content-between w-100 fs-5 fw-semibold">
                  <p className="m-0">€ {food.price.toFixed(2)}</p>
                  <p className="m-0">Rating {food.rating}</p>
                </div>
                <div className="d-flex">
                  <AddToCartButton product={food} />
                </div>
              </div>
            ) : (
              <div className="d-flex flex-column gap-2 w-100">
                <div className="d-flex gap-3 w-100">
                  <DeleteFoodButton food={food} />
                  <EditFoodButton food={food} />
                </div>
                <div>
                  <AddToCartButton product={food} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodListing;

// import DeleteFoodButton from "./DeleteFoodButton";
// import EditFoodButton from "./EditFoodButton";

// const FoodListing = ({ food, goToFood, isHomePage }) => {
//   const onGoToFood = (foodId) => {
//     goToFood(foodId);
//   };

//   const addToCart = async (food) => {
//     const orderItem = {
//       // orderId: 1,
//       productId: food.id,
//       productName: food.name,
//       price: food.price,
//       quantity: 1, // default quantity
//       productType: "Food", // assuming this is a food item
//     };

//     try {
//       const response = await fetch("http://localhost:5071/addToCart", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(orderItem),
//       });

//       if (response.ok) {
//         alert("Item added to cart successfully!");
//       } else {
//         const errorMessage = await response.text();
//         console.log(errorMessage);
//         alert(`Failed to add item to cart: ${errorMessage}`);
//       }
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       alert("Error adding to cart");
//     }
//   };

//   return (
//     <>
//       <div className="col">
//         <div className="card food-card">
//           <img
//             src={food.imageUrl}
//             alt={`${food.name} image`}
//             className="card-img-top img-fluid"
//             onClick={() => {
//               onGoToFood(food.id);
//             }}
//           />
//           <div className="card-body">
//             <h5
//               onClick={() => {
//                 onGoToFood(food.id);
//               }}
//             >
//               {food.name}
//             </h5>
//           </div>
//           <div className="card-footer d-flex justify-content-between gap-3">
//             {isHomePage ? (
//               <div className="d-flex justify-content-between w-100 fs-5 fw-semibold">
//                 <p className="m-0">€ {food.price.toFixed(2)}</p>
//                 <p className="m-0">Rating {food.rating}</p>
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => addToCart(food)}
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <DeleteFoodButton food={food} />
//                 <EditFoodButton food={food} />
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FoodListing;
